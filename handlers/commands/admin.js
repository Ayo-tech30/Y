const { db } = require('../../firebase');

const promote = async (sock, msg, args, context) => {
  if (!context.isGroup) return sock.sendMessage(context.from, { text: '❌ This command is only for groups!' }, { quoted: msg });
  if (!context.isAdmin) return sock.sendMessage(context.from, { text: '❌ Only admins can use this!' }, { quoted: msg });
  if (!context.isBotAdmin) return sock.sendMessage(context.from, { text: '❌ Bot must be admin!' }, { quoted: msg });

  const user = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
  if (!user) return sock.sendMessage(context.from, { text: '❌ Mention a user!' }, { quoted: msg });

  await sock.groupParticipantsUpdate(context.from, [user], 'promote');
  
  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗣𝗥𝗢𝗠𝗢𝗧𝗘𝗗 𖣔━━╮
│                       
│  👑 𝙐𝙨𝙚𝙧 𝙋𝙧𝙤𝙢𝙤𝙩𝙚𝙙!
│  
│  ✨ @${user.split('@')[0]}
│  
│  💜 𝙉𝙤𝙬 𝙖𝙣 𝙖𝙙𝙢𝙞𝙣!
│
╰━━━━━━━━━━━━━━━━━━━╯`,
    mentions: [user]
  }, { quoted: msg });
};

const demote = async (sock, msg, args, context) => {
  if (!context.isGroup) return sock.sendMessage(context.from, { text: '❌ This command is only for groups!' }, { quoted: msg });
  if (!context.isAdmin) return sock.sendMessage(context.from, { text: '❌ Only admins can use this!' }, { quoted: msg });
  if (!context.isBotAdmin) return sock.sendMessage(context.from, { text: '❌ Bot must be admin!' }, { quoted: msg });

  const user = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
  if (!user) return sock.sendMessage(context.from, { text: '❌ Mention a user!' }, { quoted: msg });

  await sock.groupParticipantsUpdate(context.from, [user], 'demote');
  
  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗗𝗘𝗠𝗢𝗧𝗘𝗗 𖣔━━╮
│                       
│  📉 𝘼𝙙𝙢𝙞𝙣 𝙍𝙚𝙢𝙤𝙫𝙚𝙙
│  
│  👤 @${user.split('@')[0]}
│  
│  💜 𝙉𝙤 𝙡𝙤𝙣𝙜𝙚𝙧 𝙖𝙣 𝙖𝙙𝙢𝙞𝙣
│
╰━━━━━━━━━━━━━━━━━━━╯`,
    mentions: [user]
  }, { quoted: msg });
};

const mute = async (sock, msg, args, context) => {
  const user = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
  if (!user) return sock.sendMessage(context.from, { text: '❌ Mention a user!' }, { quoted: msg });

  const groupRef = db.collection('groups').doc(context.from);
  await groupRef.set({
    mutedUsers: db.FieldValue.arrayUnion(user)
  }, { merge: true });

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗠𝗨𝗧𝗘𝗗 𖣔━━╮
│                       
│  🔇 𝙐𝙨𝙚𝙧 𝙈𝙪𝙩𝙚𝙙
│  
│  🤐 @${user.split('@')[0]}
│  
│  💜 𝘾𝙖𝙣'𝙩 𝙪𝙨𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙𝙨
│
╰━━━━━━━━━━━━━━━━━━━╯`,
    mentions: [user]
  }, { quoted: msg });
};

const unmute = async (sock, msg, args, context) => {
  const user = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
  if (!user) return sock.sendMessage(context.from, { text: '❌ Mention a user!' }, { quoted: msg });

  const groupRef = db.collection('groups').doc(context.from);
  await groupRef.update({
    mutedUsers: db.FieldValue.arrayRemove(user)
  });

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗨𝗡𝗠𝗨𝗧𝗘𝗗 𖣔━━╮
│                       
│  🔊 𝙐𝙨𝙚𝙧 𝙐𝙣𝙢𝙪𝙩𝙚𝙙
│  
│  🗣️ @${user.split('@')[0]}
│  
│  💜 𝘾𝙖𝙣 𝙪𝙨𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙𝙨 𝙖𝙜𝙖𝙞𝙣
│
╰━━━━━━━━━━━━━━━━━━━╯`,
    mentions: [user]
  }, { quoted: msg });
};

const warn = async (sock, msg, args, context) => {
  if (!context.isAdmin) return sock.sendMessage(context.from, { text: '❌ Only admins can use this!' }, { quoted: msg });

  const user = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
  if (!user) return sock.sendMessage(context.from, { text: '❌ Mention a user!' }, { quoted: msg });

  const userRef = db.collection('users').doc(user);
  const userDoc = await userRef.get();
  const currentWarns = userDoc.data()?.warns || 0;
  const newWarns = currentWarns + 1;

  await userRef.set({ warns: newWarns }, { merge: true });

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗪𝗔𝗥𝗡𝗜𝗡𝗚 𖣔━━╮
│                       
│  ⚠️ 𝙐𝙨𝙚𝙧 𝙒𝙖𝙧𝙣𝙚𝙙!
│  
│  👤 @${user.split('@')[0]}
│  📊 𝙒𝙖𝙧𝙣𝙨: ${newWarns}/3
│  
│  ${newWarns >= 3 ? '❌ Maximum warnings reached!' : '💜 Be careful!'}
│
╰━━━━━━━━━━━━━━━━━━━╯`,
    mentions: [user]
  }, { quoted: msg });

  if (newWarns >= 3 && context.isBotAdmin) {
    await sock.groupParticipantsUpdate(context.from, [user], 'remove');
  }
};

const warnCount = async (sock, msg, args, context) => {
  const user = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || context.sender;
  const userRef = db.collection('users').doc(user);
  const userDoc = await userRef.get();
  const warns = userDoc.data()?.warns || 0;

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗪𝗔𝗥𝗡 𝗖𝗢𝗨𝗡𝗧 𖣔━━╮
│                       
│  👤 @${user.split('@')[0]}
│  
│  ⚠️ 𝙒𝙖𝙧𝙣𝙞𝙣𝙜𝙨: ${warns}/3
│  
│  💜 ${warns === 0 ? 'Clean record!' : warns < 3 ? 'Watch out!' : 'Maximum reached!'}
│
╰━━━━━━━━━━━━━━━━━━━╯`,
    mentions: [user]
  }, { quoted: msg });
};

const resetWarn = async (sock, msg, args, context) => {
  if (!context.isAdmin) return sock.sendMessage(context.from, { text: '❌ Only admins can use this!' }, { quoted: msg });

  const user = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
  if (!user) return sock.sendMessage(context.from, { text: '❌ Mention a user!' }, { quoted: msg });

  const userRef = db.collection('users').doc(user);
  await userRef.update({ warns: 0 });

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗪𝗔𝗥𝗡 𝗥𝗘𝗦𝗘𝗧 𖣔━━╮
│                       
│  ✅ 𝙒𝙖𝙧𝙣𝙞𝙣𝙜𝙨 𝙍𝙚𝙨𝙚𝙩!
│  
│  👤 @${user.split('@')[0]}
│  📊 𝙒𝙖𝙧𝙣𝙨: 0/3
│  
│  💜 𝙁𝙧𝙚𝙨𝙝 𝙨𝙩𝙖𝙧𝙩!
│
╰━━━━━━━━━━━━━━━━━━━╯`,
    mentions: [user]
  }, { quoted: msg });
};

const kick = async (sock, msg, args, context) => {
  if (!context.isGroup) return sock.sendMessage(context.from, { text: '❌ This command is only for groups!' }, { quoted: msg });
  if (!context.isAdmin) return sock.sendMessage(context.from, { text: '❌ Only admins can use this!' }, { quoted: msg });
  if (!context.isBotAdmin) return sock.sendMessage(context.from, { text: '❌ Bot must be admin!' }, { quoted: msg });

  const user = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
  if (!user) return sock.sendMessage(context.from, { text: '❌ Mention a user!' }, { quoted: msg });

  await sock.groupParticipantsUpdate(context.from, [user], 'remove');
  
  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗞𝗜𝗖𝗞𝗘𝗗 𖣔━━╮
│                       
│  ❌ 𝙐𝙨𝙚𝙧 𝙍𝙚𝙢𝙤𝙫𝙚𝙙
│  
│  👋 @${user.split('@')[0]}
│  
│  💜 𝙂𝙤𝙤𝙙𝙗𝙮𝙚!
│
╰━━━━━━━━━━━━━━━━━━━╯`,
    mentions: [user]
  }, { quoted: msg });
};

const deleteMsg = async (sock, msg, args, context) => {
  if (!context.isAdmin) return sock.sendMessage(context.from, { text: '❌ Only admins can use this!' }, { quoted: msg });

  if (!msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
    return sock.sendMessage(context.from, { text: '❌ Reply to a message to delete it!' }, { quoted: msg });
  }

  const quotedMsg = msg.message.extendedTextMessage.contextInfo;
  await sock.sendMessage(context.from, { delete: { ...quotedMsg.stanzaId, fromMe: false, participant: quotedMsg.participant } });
};

const tagAll = async (sock, msg, args, context) => {
  if (!context.isGroup) return sock.sendMessage(context.from, { text: '❌ This command is only for groups!' }, { quoted: msg });
  if (!context.isAdmin) return sock.sendMessage(context.from, { text: '❌ Only admins can use this!' }, { quoted: msg });

  const groupMetadata = await sock.groupMetadata(context.from);
  const participants = groupMetadata.participants;
  const message = args.join(' ') || 'Attention everyone!';

  let tagText = `╭━━𖣔 𝙂𝙍𝙊𝙐𝙋 𝙏𝘼𝙂 𖣔━━╮
│                       
│  📢 𝘼𝙉𝙉𝙊𝙐𝙉𝘾𝙀𝙈𝙀𝙉𝙏
│  
│  💬 𝙈𝙚𝙨𝙨𝙖𝙜𝙚:
│  ${message}
│
╰━━━━━━━━━━━━━━━━━━━╯

👥 𝙏𝘼𝙂𝙂𝙀𝘿 𝙈𝙀𝙈𝘽𝙀𝙍𝙎
━━━━━━━━━━━━━━━
`;

  participants.forEach((participant, i) => {
    tagText += `᯽ @${participant.id.split('@')[0]}\n`;
  });

  tagText += `━━━━━━━━━━━━━━━

💜 𝙏𝙤𝙩𝙖𝙡: ${participants.length} 𝙈𝙚𝙢𝙗𝙚𝙧𝙨 𝙏𝙖𝙜𝙜𝙚𝙙`;

  await sock.sendMessage(context.from, {
    text: tagText,
    mentions: participants.map(p => p.id)
  });
};

const hideTag = async (sock, msg, args, context) => {
  if (!context.isGroup) return sock.sendMessage(context.from, { text: '❌ This command is only for groups!' }, { quoted: msg });
  if (!context.isAdmin) return sock.sendMessage(context.from, { text: '❌ Only admins can use this!' }, { quoted: msg });

  const groupMetadata = await sock.groupMetadata(context.from);
  const participants = groupMetadata.participants;
  const message = args.join(' ') || 'Hidden tag message';

  await sock.sendMessage(context.from, {
    text: message,
    mentions: participants.map(p => p.id)
  });
};

const welcome = async (sock, msg, args, context) => {
  if (!context.isAdmin) return sock.sendMessage(context.from, { text: '❌ Only admins can use this!' }, { quoted: msg });

  const status = args[0]?.toLowerCase();
  if (status !== 'on' && status !== 'off') {
    return sock.sendMessage(context.from, { text: '❌ Use: .welcome on/off' }, { quoted: msg });
  }

  const groupRef = db.collection('groups').doc(context.from);
  await groupRef.set({ welcome: status === 'on' }, { merge: true });

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𖣔━━╮
│                       
│  ✅ 𝙎𝙚𝙩𝙩𝙞𝙣𝙜 𝙐𝙥𝙙𝙖𝙩𝙚𝙙!
│  
│  ${status === 'on' ? '✅ Welcome messages enabled' : '❌ Welcome messages disabled'}
│  
│  💜 𝘾𝙤𝙣𝙛𝙞𝙜𝙪𝙧𝙚𝙙 𝙨𝙪𝙘𝙘𝙚𝙨𝙨𝙛𝙪𝙡𝙡𝙮
│
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

const goodbye = async (sock, msg, args, context) => {
  if (!context.isAdmin) return sock.sendMessage(context.from, { text: '❌ Only admins can use this!' }, { quoted: msg });

  const status = args[0]?.toLowerCase();
  if (status !== 'on' && status !== 'off') {
    return sock.sendMessage(context.from, { text: '❌ Use: .goodbye on/off' }, { quoted: msg });
  }

  const groupRef = db.collection('groups').doc(context.from);
  await groupRef.set({ goodbye: status === 'on' }, { merge: true });

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗚𝗢𝗢𝗗𝗕𝗬𝗘 𖣔━━╮
│                       
│  ✅ 𝙎𝙚𝙩𝙩𝙞𝙣𝙜 𝙐𝙥𝙙𝙖𝙩𝙚𝙙!
│  
│  ${status === 'on' ? '✅ Goodbye messages enabled' : '❌ Goodbye messages disabled'}
│  
│  💜 𝘾𝙤𝙣𝙛𝙞𝙜𝙪𝙧𝙚𝙙 𝙨𝙪𝙘𝙘𝙚𝙨𝙨𝙛𝙪𝙡𝙡𝙮
│
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

const antilink = async (sock, msg, args, context) => {
  if (!context.isAdmin) return sock.sendMessage(context.from, { text: '❌ Only admins can use this!' }, { quoted: msg });

  const status = args[0]?.toLowerCase();
  if (status !== 'on' && status !== 'off') {
    return sock.sendMessage(context.from, { text: '❌ Use: .antilink on/off' }, { quoted: msg });
  }

  const groupRef = db.collection('groups').doc(context.from);
  await groupRef.set({ antilink: status === 'on' }, { merge: true });

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗔𝗡𝗧𝗜𝗟𝗜𝗡𝗞 𖣔━━╮
│                       
│  ✅ 𝙎𝙚𝙩𝙩𝙞𝙣𝙜 𝙐𝙥𝙙𝙖𝙩𝙚𝙙!
│  
│  ${status === 'on' ? '✅ Antilink enabled' : '❌ Antilink disabled'}
│  
│  💜 ${status === 'on' ? 'Links will be deleted' : 'Links are allowed'}
│
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

const groupInfo = async (sock, msg, args, context) => {
  if (!context.isGroup) return sock.sendMessage(context.from, { text: '❌ This command is only for groups!' }, { quoted: msg });

  const groupMetadata = await sock.groupMetadata(context.from);
  const admins = groupMetadata.participants.filter(p => p.admin).length;

  const response = `╭━━𖣔 𝗚𝗥𝗢𝗨𝗣 𝗜𝗡𝗙𝗢 𖣔━━╮
│                       
│  📱 ${groupMetadata.subject}
│  
│  👥 𝙈𝙚𝙢𝙗𝙚𝙧𝙨: ${groupMetadata.participants.length}
│  👑 𝘼𝙙𝙢𝙞𝙣𝙨: ${admins}
│  📝 𝘿𝙚𝙨𝙘: ${groupMetadata.desc || 'No description'}
│  
│  💜 𝙂𝙧𝙤𝙪𝙥 𝙄𝘿: ${context.from.split('@')[0]}
│
╰━━━━━━━━━━━━━━━━━━━╯`;

  await sock.sendMessage(context.from, { text: response }, { quoted: msg });
};

module.exports = {
  promote,
  demote,
  mute,
  unmute,
  warn,
  warnCount,
  resetWarn,
  kick,
  deleteMsg,
  tagAll,
  hideTag,
  welcome,
  goodbye,
  antilink,
  groupInfo
};
