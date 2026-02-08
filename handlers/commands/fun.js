const match = async (sock, msg, args, context) => {
  const user = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
  if (!user) {
    return sock.sendMessage(context.from, { text: '❌ Mention a user!' }, { quoted: msg });
  }

  const percentage = Math.floor(Math.random() * 101);
  const hearts = '❤️'.repeat(Math.floor(percentage / 10));

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗠𝗔𝗧𝗖𝗛 𖣔━━╮
│                       
│  💘 𝙇𝙤𝙫𝙚 𝙈𝙖𝙩𝙘𝙝
│  
│  👤 @${context.sender.split('@')[0]}
│  💕 @${user.split('@')[0]}
│  
│  ${hearts}
│  📊 ${percentage}% 𝙈𝙖𝙩𝙘𝙝!
│  
│  💜 ${percentage > 70 ? 'Perfect match!' : percentage > 40 ? 'Good chemistry!' : 'Just friends!'}
│
╰━━━━━━━━━━━━━━━━━━━╯`,
    mentions: [context.sender, user]
  }, { quoted: msg });
};

const roast = async (sock, msg, args, context) => {
  const user = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
  if (!user) {
    return sock.sendMessage(context.from, { text: '❌ Mention a user!' }, { quoted: msg });
  }

  const roasts = [
    "is so dense, light bends around them!",
    "has an IQ lower than room temperature!",
    "needs GPS to find their way out of a paper bag!",
    "is proof that evolution can go in reverse!",
    "makes rocks look smart!"
  ];

  const roast = roasts[Math.floor(Math.random() * roasts.length)];

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗥𝗢𝗔𝗦𝗧 𖣔━━╮
│                       
│  🔥 @${user.split('@')[0]}
│  
│  ${roast}
│  
│  💜 𝙅𝙪𝙨𝙩 𝙛𝙤𝙧 𝙛𝙪𝙣!
│
╰━━━━━━━━━━━━━━━━━━━╯`,
    mentions: [user]
  }, { quoted: msg });
};

const simp = async (sock, msg, args, context) => {
  const user = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
  if (!user) {
    return sock.sendMessage(context.from, { text: '❌ Mention a user!' }, { quoted: msg });
  }

  const percentage = Math.floor(Math.random() * 101);

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗦𝗜𝗠𝗣 𝗠𝗘𝗧𝗘𝗥 𖣔━━╮
│                       
│  😍 @${context.sender.split('@')[0]}
│  
│  💝 𝙎𝙞𝙢𝙥𝙞𝙣𝙜 𝙛𝙤𝙧 @${user.split('@')[0]}
│  
│  📊 ${percentage}% 𝙎𝙞𝙢𝙥!
│  
│  💜 ${percentage > 80 ? 'Ultimate simp!' : percentage > 50 ? 'Big simp energy!' : 'Not much simp!'}
│
╰━━━━━━━━━━━━━━━━━━━╯`,
    mentions: [context.sender, user]
  }, { quoted: msg });
};

module.exports = {
  match,
  roast,
  simp
};
