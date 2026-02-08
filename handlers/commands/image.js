const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const sharp = require('sharp');
const fs = require('fs').promises;

const sticker = async (sock, msg, args, context) => {
  const quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  
  if (!msg.message.imageMessage && !quotedMsg?.imageMessage) {
    return sock.sendMessage(context.from, { text: '❌ Reply to an image with .sticker' }, { quoted: msg });
  }

  try {
    const buffer = await downloadMediaMessage(msg, 'buffer', {});
    const sticker = await sharp(buffer)
      .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp()
      .toBuffer();

    await sock.sendMessage(context.from, {
      sticker: sticker
    }, { quoted: msg });
  } catch (error) {
    await sock.sendMessage(context.from, { text: '❌ Error creating sticker!' }, { quoted: msg });
  }
};

const blur = async (sock, msg, args, context) => {
  const quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  
  if (!msg.message.imageMessage && !quotedMsg?.imageMessage) {
    return sock.sendMessage(context.from, { text: '❌ Reply to an image with .blur' }, { quoted: msg });
  }

  try {
    const buffer = await downloadMediaMessage(msg, 'buffer', {});
    const blurred = await sharp(buffer)
      .blur(10)
      .toBuffer();

    await sock.sendMessage(context.from, {
      image: blurred,
      caption: '╭━━𖣔 𝗕𝗟𝗨𝗥𝗥𝗘𝗗 𖣔━━╮\n│  ✨ Image blurred!\n╰━━━━━━━━━━━━━━━━━━━╯'
    }, { quoted: msg });
  } catch (error) {
    await sock.sendMessage(context.from, { text: '❌ Error blurring image!' }, { quoted: msg });
  }
};

const removebg = async (sock, msg, args, context) => {
  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗥𝗘𝗠𝗢𝗩𝗘 𝗕𝗚 𖣔━━╮
│                       
│  🖼️ 𝘽𝙖𝙘𝙠𝙜𝙧𝙤𝙪𝙣𝙙 𝙍𝙚𝙢𝙤𝙫𝙖𝙡
│  
│  💜 Connect remove.bg API
│  
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

module.exports = {
  sticker,
  blur,
  removebg
};
