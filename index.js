const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, Browsers } = require('@whiskeysockets/baileys');
const pino = require('pino');
const readline = require('readline');
const chalk = require('chalk');
const { Boom } = require('@hapi/boom');
const { db } = require('./firebase');
const { handleCommand } = require('./handlers/commandHandler');

// Suppress Replit connection warnings
const logger = pino({ level: 'silent' });

let botMode = 'public'; // 'public' or 'private'
let sock;
let lastCommandTimestamp = {};

// Create readline interface for pairing code
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (text) => new Promise((resolve) => rl.question(text, resolve));

async function startBot() {
  console.log(chalk.cyan(`
╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮
│                             │
│   🌟 NEXORA VIOLET BOT 🌟   │
│      By Kynx                │
│                             │
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
  `));

  const { state, saveCreds } = await useMultiFileAuthState('./auth_info');
  const { version } = await fetchLatestBaileysVersion();

  sock = makeWASocket({
    version,
    logger,
    printQRInTerminal: false,
    browser: Browsers.macOS('Desktop'),
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger),
    },
    getMessage: async (key) => {
      return { conversation: '' };
    }
  });

  // Handle pairing code
  if (!sock.authState.creds.registered) {
    console.log(chalk.yellow('\n⚡ Bot is not paired with WhatsApp\n'));
    const phoneNumber = await question(chalk.green('📱 Enter your WhatsApp number (with country code, e.g., 1234567890): '));
    
    const code = await sock.requestPairingCode(phoneNumber.trim());
    console.log(chalk.magenta(`\n🔐 Your Pairing Code: ${chalk.bold(code)}\n`));
    console.log(chalk.cyan('Enter this code in WhatsApp > Linked Devices > Link a Device\n'));
  }

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect?.error instanceof Boom)
        ? lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut
        : true;

      if (shouldReconnect) {
        console.log(chalk.yellow('⚠️  Connection closed. Reconnecting...'));
        setTimeout(() => startBot(), 3000);
      } else {
        console.log(chalk.red('❌ Logged out. Please delete auth_info and restart.'));
        process.exit(0);
      }
    } else if (connection === 'open') {
      console.log(chalk.green('✅ Connected to WhatsApp successfully!'));
      console.log(chalk.cyan(`🤖 Bot Mode: ${botMode.toUpperCase()}`));
      
      // Record bot start time
      lastCommandTimestamp = {};
      global.botStartTime = Date.now();
    }
  });

  // Handle incoming messages
  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    
    if (!msg.message) return;
    if (msg.key.fromMe) return;
    
    // Ignore messages sent before bot started
    const messageTime = msg.messageTimestamp * 1000;
    if (messageTime < global.botStartTime) return;

    const from = msg.key.remoteJid;
    const isGroup = from.endsWith('@g.us');
    const sender = msg.key.participant || msg.key.remoteJid;
    const body = msg.message.conversation || 
                 msg.message.extendedTextMessage?.text || 
                 msg.message.imageMessage?.caption || 
                 msg.message.videoMessage?.caption || '';

    // Check bot mode
    if (botMode === 'private' && !isGroup) {
      // In private mode, only respond in groups
      return;
    }

    if (!body.startsWith('.')) return;

    const args = body.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Handle mode command
    if (command === 'mode') {
      const newMode = args[0]?.toLowerCase();
      if (newMode === 'private' || newMode === 'public') {
        botMode = newMode;
        await sock.sendMessage(from, {
          text: `╭━━𖣔 𝗠𝗢𝗗𝗘 𝗖𝗛𝗔𝗡𝗚𝗘𝗗 𖣔━━╮
│                       
│  ⚙️ 𝘽𝙤𝙩 𝙈𝙤𝙙𝙚: ${newMode.toUpperCase()}
│  
│  ${newMode === 'private' ? '🔒 Bot will only respond in groups' : '🌐 Bot will respond everywhere'}
│
╰━━━━━━━━━━━━━━━━━━━╯`
        }, { quoted: msg });
      }
      return;
    }

    // Check if user is admin (for admin commands)
    let isAdmin = false;
    let isBotAdmin = false;
    
    if (isGroup) {
      const groupMetadata = await sock.groupMetadata(from);
      const participants = groupMetadata.participants;
      
      isAdmin = participants.find(p => p.id === sender)?.admin !== undefined;
      const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net';
      isBotAdmin = participants.find(p => p.id === botNumber)?.admin !== undefined;
      
      // If WhatsApp number is admin, bot automatically becomes admin
      if (isAdmin && !isBotAdmin) {
        // This is just a permission check, actual admin rights are controlled by WhatsApp
      }
    }

    // Handle commands
    try {
      await handleCommand(sock, msg, command, args, {
        from,
        sender,
        isGroup,
        isAdmin,
        isBotAdmin,
        botMode
      });
    } catch (error) {
      console.log(chalk.red('Error handling command:'), error.message);
    }
  });

  // Handle group updates
  sock.ev.on('group-participants.update', async (update) => {
    const { id, participants, action } = update;
    
    try {
      const groupDoc = await db.collection('groups').doc(id).get();
      const groupData = groupDoc.data() || {};

      const metadata = await sock.groupMetadata(id);
      
      for (let participant of participants) {
        if (action === 'add' && groupData.welcome) {
          await sock.sendMessage(id, {
            text: `╭━━𖣔 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𖣔━━╮
│                       
│  👋 𝙒𝙚𝙡𝙘𝙤𝙢𝙚 𝙩𝙤 ${metadata.subject}!
│  
│  🌟 @${participant.split('@')[0]}
│  
│  💜 𝙀𝙣𝙟𝙤𝙮 𝙮𝙤𝙪𝙧 𝙨𝙩𝙖𝙮!
│
╰━━━━━━━━━━━━━━━━━━━╯`,
            mentions: [participant]
          });
        } else if (action === 'remove' && groupData.goodbye) {
          await sock.sendMessage(id, {
            text: `╭━━𖣔 𝗚𝗢𝗢𝗗𝗕𝗬𝗘 𖣔━━╮
│                       
│  👋 𝙂𝙤𝙤𝙙𝙗𝙮𝙚
│  
│  🌟 @${participant.split('@')[0]}
│  
│  💜 𝙏𝙝𝙖𝙣𝙠𝙨 𝙛𝙤𝙧 𝙗𝙚𝙞𝙣𝙜 𝙝𝙚𝙧𝙚!
│
╰━━━━━━━━━━━━━━━━━━━╯`,
            mentions: [participant]
          });
        }
      }
    } catch (error) {
      console.log(chalk.red('Error handling group update:'), error.message);
    }
  });
}

startBot();

module.exports = { sock };
