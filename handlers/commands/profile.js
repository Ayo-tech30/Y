const { db } = require('../../firebase');
const { downloadMediaMessage } = require('@whiskeysockets/baileys');

const profile = async (sock, msg, args, context) => {
  let targetUser = context.sender;
  
  if (msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]) {
    targetUser = msg.message.extendedTextMessage.contextInfo.mentionedJid[0];
  }

  const userRef = db.collection('users').doc(targetUser);
  const userDoc = await userRef.get();

  if (!userDoc.exists || !userDoc.data().registered) {
    return sock.sendMessage(context.from, {
      text: '❌ User not registered! Use .register first.'
    }, { quoted: msg });
  }

  const data = userDoc.data();
  const response = `╭━━𖣔 𝗣𝗥𝗢𝗙𝗜𝗟𝗘 𖣔━━╮
│                       
│  👤 @${targetUser.split('@')[0]}
│  
│  📝 𝙉𝙖𝙢𝙚: ${data.name || 'Traveler'}
│  🎂 𝘼𝙜𝙚: ${data.age || 'Unknown'}
│  ⭐ 𝙇𝙚𝙫𝙚𝙡: ${data.level || 1}
│  ✨ 𝙓𝙋: ${data.xp || 0}
│  
│  💰 𝙒𝙖𝙡𝙡𝙚𝙩: ${data.wallet || 0}
│  🏦 𝘽𝙖𝙣𝙠: ${data.bank || 0}
│  🎴 𝘾𝙖𝙧𝙙𝙨: ${data.cards?.length || 0}
│  
│  💭 "${data.profileQuote || 'No quote set'}"
│
╰━━━━━━━━━━━━━━━━━━━╯`;

  await sock.sendMessage(context.from, { 
    text: response,
    mentions: [targetUser]
  }, { quoted: msg });
};

const setProfile = async (sock, msg, args, context) => {
  if (!msg.message.imageMessage) {
    return sock.sendMessage(context.from, {
      text: '❌ Please reply to an image with .setprofile'
    }, { quoted: msg });
  }

  const response = `╭━━𖣔 𝗣𝗥𝗢𝗙𝗜𝗟𝗘 𖣔━━╮
│                       
│  ✅ 𝙋𝙧𝙤𝙛𝙞𝙡𝙚 𝙐𝙥𝙙𝙖𝙩𝙚𝙙!
│  
│  🖼️ 𝙉𝙚𝙬 𝙥𝙧𝙤𝙛𝙞𝙡𝙚 𝙥𝙞𝙘𝙩𝙪𝙧𝙚 𝙨𝙚𝙩
│  
│  💜 𝙇𝙤𝙤𝙠𝙞𝙣𝙜 𝙜𝙤𝙤𝙙!
│
╰━━━━━━━━━━━━━━━━━━━╯`;

  await sock.sendMessage(context.from, { text: response }, { quoted: msg });
};

const setProfileQuote = async (sock, msg, args, context) => {
  const quote = args.join(' ');
  
  if (!quote) {
    return sock.sendMessage(context.from, {
      text: '❌ Please provide a quote! Usage: .setprofilequote <your quote>'
    }, { quoted: msg });
  }

  const userRef = db.collection('users').doc(context.sender);
  await userRef.update({ profileQuote: quote });

  const response = `╭━━𖣔 𝗤𝗨𝗢𝗧𝗘 𝗨𝗣𝗗𝗔𝗧𝗘𝗗 𖣔━━╮
│                       
│  ✅ 𝙌𝙪𝙤𝙩𝙚 𝙎𝙚𝙩!
│  
│  💭 "${quote}"
│  
│  💜 𝙔𝙤𝙪𝙧 𝙣𝙚𝙬 𝙦𝙪𝙤𝙩𝙚 𝙞𝙨 𝙡𝙞𝙫𝙚!
│
╰━━━━━━━━━━━━━━━━━━━╯`;

  await sock.sendMessage(context.from, { text: response }, { quoted: msg });
};

const setAge = async (sock, msg, args, context) => {
  const age = parseInt(args[0]);
  
  if (!age || age < 1 || age > 120) {
    return sock.sendMessage(context.from, {
      text: '❌ Please provide a valid age (1-120)!'
    }, { quoted: msg });
  }

  const userRef = db.collection('users').doc(context.sender);
  await userRef.update({ age });

  const response = `╭━━𖣔 𝗔𝗚𝗘 𝗨𝗣𝗗𝗔𝗧𝗘𝗗 𖣔━━╮
│                       
│  ✅ 𝘼𝙜𝙚 𝙎𝙚𝙩!
│  
│  🎂 ${age} 𝙮𝙚𝙖𝙧𝙨 𝙤𝙡𝙙
│  
│  💜 𝙋𝙧𝙤𝙛𝙞𝙡𝙚 𝙪𝙥𝙙𝙖𝙩𝙚𝙙!
│
╰━━━━━━━━━━━━━━━━━━━╯`;

  await sock.sendMessage(context.from, { text: response }, { quoted: msg });
};

const setName = async (sock, msg, args, context) => {
  const name = args.join(' ');
  
  if (!name || name.length < 2 || name.length > 30) {
    return sock.sendMessage(context.from, {
      text: '❌ Please provide a valid name (2-30 characters)!'
    }, { quoted: msg });
  }

  const userRef = db.collection('users').doc(context.sender);
  await userRef.update({ name });

  const response = `╭━━𖣔 𝗡𝗔𝗠𝗘 𝗨𝗣𝗗𝗔𝗧𝗘𝗗 𖣔━━╮
│                       
│  ✅ 𝙉𝙖𝙢𝙚 𝙎𝙚𝙩!
│  
│  📝 ${name}
│  
│  💜 𝙋𝙧𝙤𝙛𝙞𝙡𝙚 𝙪𝙥𝙙𝙖𝙩𝙚𝙙!
│
╰━━━━━━━━━━━━━━━━━━━╯`;

  await sock.sendMessage(context.from, { text: response }, { quoted: msg });
};

module.exports = {
  profile,
  setProfile,
  setProfileQuote,
  setAge,
  setName
};
