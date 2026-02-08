const { db } = require('../../firebase');

const balance = async (sock, msg, args, context) => {
  let targetUser = context.sender;
  
  if (msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]) {
    targetUser = msg.message.extendedTextMessage.contextInfo.mentionedJid[0];
  }

  const userRef = db.collection('users').doc(targetUser);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    return sock.sendMessage(context.from, { text: '❌ User not registered!' }, { quoted: msg });
  }

  const data = userDoc.data();
  const response = `╭━━𖣔 𝗕𝗔𝗟𝗔𝗡𝗖𝗘 𖣔━━╮
│                       
│  👤 @${targetUser.split('@')[0]}
│  
│  💰 𝙒𝙖𝙡𝙡𝙚𝙩: ${data.wallet || 0} 𝙘𝙤𝙞𝙣𝙨
│  🏦 𝘽𝙖𝙣𝙠: ${data.bank || 0} 𝙘𝙤𝙞𝙣𝙨
│  
│  💎 𝙏𝙤𝙩𝙖𝙡: ${(data.wallet || 0) + (data.bank || 0)} 𝙘𝙤𝙞𝙣𝙨
│
╰━━━━━━━━━━━━━━━━━━━╯`;

  await sock.sendMessage(context.from, { 
    text: response,
    mentions: [targetUser]
  }, { quoted: msg });
};

const deposit = async (sock, msg, args, context) => {
  const amount = parseInt(args[0]);
  if (!amount || amount < 1) {
    return sock.sendMessage(context.from, { text: '❌ Invalid amount!' }, { quoted: msg });
  }

  const userRef = db.collection('users').doc(context.sender);
  const userDoc = await userRef.get();
  const wallet = userDoc.data()?.wallet || 0;
  const bank = userDoc.data()?.bank || 0;

  if (wallet < amount) {
    return sock.sendMessage(context.from, { text: '❌ Insufficient balance in wallet!' }, { quoted: msg });
  }

  await userRef.update({
    wallet: wallet - amount,
    bank: bank + amount
  });

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗗𝗘𝗣𝗢𝗦𝗜𝗧 𖣔━━╮
│                       
│  ✅ 𝘿𝙚𝙥𝙤𝙨𝙞𝙩 𝙎𝙪𝙘𝙘𝙚𝙨𝙨𝙛𝙪𝙡!
│  
│  💰 ${amount} 𝙘𝙤𝙞𝙣𝙨
│  
│  💵 𝙒𝙖𝙡𝙡𝙚𝙩: ${wallet - amount}
│  🏦 𝘽𝙖𝙣𝙠: ${bank + amount}
│
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

const withdraw = async (sock, msg, args, context) => {
  const amount = parseInt(args[0]);
  if (!amount || amount < 1) {
    return sock.sendMessage(context.from, { text: '❌ Invalid amount!' }, { quoted: msg });
  }

  const userRef = db.collection('users').doc(context.sender);
  const userDoc = await userRef.get();
  const wallet = userDoc.data()?.wallet || 0;
  const bank = userDoc.data()?.bank || 0;

  if (bank < amount) {
    return sock.sendMessage(context.from, { text: '❌ Insufficient balance in bank!' }, { quoted: msg });
  }

  await userRef.update({
    wallet: wallet + amount,
    bank: bank - amount
  });

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗪𝗜𝗧𝗛𝗗𝗥𝗔𝗪𝗔𝗟 𖣔━━╮
│                       
│  ✅ 𝙒𝙞𝙩𝙝𝙙𝙧𝙖𝙬𝙖𝙡 𝙎𝙪𝙘𝙘𝙚𝙨𝙨𝙛𝙪𝙡!
│  
│  💰 ${amount} 𝙘𝙤𝙞𝙣𝙨
│  
│  💵 𝙒𝙖𝙡𝙡𝙚𝙩: ${wallet + amount}
│  🏦 𝘽𝙖𝙣𝙠: ${bank - amount}
│
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

const send = async (sock, msg, args, context) => {
  const user = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
  if (!user) return sock.sendMessage(context.from, { text: '❌ Mention a user!' }, { quoted: msg });

  const amount = parseInt(args[1]);
  if (!amount || amount < 1) {
    return sock.sendMessage(context.from, { text: '❌ Invalid amount!' }, { quoted: msg });
  }

  const senderRef = db.collection('users').doc(context.sender);
  const receiverRef = db.collection('users').doc(user);
  
  const senderDoc = await senderRef.get();
  const wallet = senderDoc.data()?.wallet || 0;

  if (wallet < amount) {
    return sock.sendMessage(context.from, { text: '❌ Insufficient balance!' }, { quoted: msg });
  }

  await senderRef.update({ wallet: wallet - amount });
  await receiverRef.set({ 
    wallet: db.FieldValue.increment(amount) 
  }, { merge: true });

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗧𝗥𝗔𝗡𝗦𝗙𝗘𝗥 𖣔━━╮
│                       
│  ✅ 𝙏𝙧𝙖𝙣𝙨𝙛𝙚𝙧 𝘾𝙤𝙢𝙥𝙡𝙚𝙩𝙚!
│  
│  💰 ${amount} 𝙘𝙤𝙞𝙣𝙨
│  👤 𝙁𝙧𝙤𝙢: @${context.sender.split('@')[0]}
│  👤 𝙏𝙤: @${user.split('@')[0]}
│  
│  💜 𝙎𝙚𝙣𝙩 𝙨𝙪𝙘𝙘𝙚𝙨𝙨𝙛𝙪𝙡𝙡𝙮!
│
╰━━━━━━━━━━━━━━━━━━━╯`,
    mentions: [context.sender, user]
  }, { quoted: msg });
};

const daily = async (sock, msg, args, context) => {
  const userRef = db.collection('users').doc(context.sender);
  const userDoc = await userRef.get();
  const lastDaily = userDoc.data()?.lastDaily || 0;
  const now = Date.now();
  const cooldown = 24 * 60 * 60 * 1000; // 24 hours

  if (now - lastDaily < cooldown) {
    const remaining = Math.ceil((cooldown - (now - lastDaily)) / 1000 / 60 / 60);
    return sock.sendMessage(context.from, {
      text: `╭━━𖣔 𝗖𝗢𝗢𝗟𝗗𝗢𝗪𝗡 𖣔━━╮
│                       
│  ⏰ 𝘾𝙤𝙢𝙚 𝙗𝙖𝙘𝙠 𝙡𝙖𝙩𝙚𝙧!
│  
│  ⏳ ${remaining} 𝙝𝙤𝙪𝙧𝙨 𝙧𝙚𝙢𝙖𝙞𝙣𝙞𝙣𝙜
│  
│  💜 𝘿𝙖𝙞𝙡𝙮 𝙧𝙚𝙬𝙖𝙧𝙙 𝙬𝙖𝙞𝙩𝙞𝙣𝙜!
│
╰━━━━━━━━━━━━━━━━━━━╯`
    }, { quoted: msg });
  }

  const reward = 1000;
  await userRef.update({
    wallet: db.FieldValue.increment(reward),
    lastDaily: now
  });

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗗𝗔𝗜𝗟𝗬 𝗥𝗘𝗪𝗔𝗥𝗗 𖣔━━╮
│                       
│  🎁 𝘿𝙖𝙞𝙡𝙮 𝘾𝙡𝙖𝙞𝙢𝙚𝙙!
│  
│  💰 +${reward} 𝙘𝙤𝙞𝙣𝙨
│  
│  💜 𝘾𝙤𝙢𝙚 𝙗𝙖𝙘𝙠 𝙩𝙤𝙢𝙤𝙧𝙧𝙤𝙬!
│
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

const weekly = async (sock, msg, args, context) => {
  const userRef = db.collection('users').doc(context.sender);
  const userDoc = await userRef.get();
  const lastWeekly = userDoc.data()?.lastWeekly || 0;
  const now = Date.now();
  const cooldown = 7 * 24 * 60 * 60 * 1000; // 7 days

  if (now - lastWeekly < cooldown) {
    const remaining = Math.ceil((cooldown - (now - lastWeekly)) / 1000 / 60 / 60 / 24);
    return sock.sendMessage(context.from, {
      text: `❌ Come back in ${remaining} days!`
    }, { quoted: msg });
  }

  const reward = 5000;
  await userRef.update({
    wallet: db.FieldValue.increment(reward),
    lastWeekly: now
  });

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗪𝗘𝗘𝗞𝗟𝗬 𝗥𝗘𝗪𝗔𝗥𝗗 𖣔━━╮
│                       
│  🎁 𝙒𝙚𝙚𝙠𝙡𝙮 𝘾𝙡𝙖𝙞𝙢𝙚𝙙!
│  
│  💰 +${reward} 𝙘𝙤𝙞𝙣𝙨
│  
│  💜 𝙎𝙚𝙚 𝙮𝙤𝙪 𝙣𝙚𝙭𝙩 𝙬𝙚𝙚𝙠!
│
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

const monthly = async (sock, msg, args, context) => {
  const userRef = db.collection('users').doc(context.sender);
  const userDoc = await userRef.get();
  const lastMonthly = userDoc.data()?.lastMonthly || 0;
  const now = Date.now();
  const cooldown = 30 * 24 * 60 * 60 * 1000; // 30 days

  if (now - lastMonthly < cooldown) {
    const remaining = Math.ceil((cooldown - (now - lastMonthly)) / 1000 / 60 / 60 / 24);
    return sock.sendMessage(context.from, {
      text: `❌ Come back in ${remaining} days!`
    }, { quoted: msg });
  }

  const reward = 20000;
  await userRef.update({
    wallet: db.FieldValue.increment(reward),
    lastMonthly: now
  });

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗠𝗢𝗡𝗧𝗛𝗟𝗬 𝗥𝗘𝗪𝗔𝗥𝗗 𖣔━━╮
│                       
│  🎁 𝙈𝙤𝙣𝙩𝙝𝙡𝙮 𝘾𝙡𝙖𝙞𝙢𝙚𝙙!
│  
│  💰 +${reward} 𝙘𝙤𝙞𝙣𝙨
│  
│  💜 𝙎𝙚𝙚 𝙮𝙤𝙪 𝙣𝙚𝙭𝙩 𝙢𝙤𝙣𝙩𝙝!
│
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

const inventory = async (sock, msg, args, context) => {
  const userRef = db.collection('users').doc(context.sender);
  const userDoc = await userRef.get();
  const inventory = userDoc.data()?.inventory || [];

  const response = `╭━━𖣔 𝗜𝗡𝗩𝗘𝗡𝗧𝗢𝗥𝗬 𖣔━━╮
│                       
│  🎒 𝙔𝙤𝙪𝙧 𝙄𝙩𝙚𝙢𝙨
│  
│  ${inventory.length === 0 ? '📦 𝙀𝙢𝙥𝙩𝙮' : inventory.join('\n│  ')}
│  
│  💜 𝘾𝙤𝙡𝙡𝙚𝙘𝙩 𝙢𝙤𝙧𝙚 𝙞𝙩𝙚𝙢𝙨!
│
╰━━━━━━━━━━━━━━━━━━━╯`;

  await sock.sendMessage(context.from, { text: response }, { quoted: msg });
};

const work = async (sock, msg, args, context) => {
  const userRef = db.collection('users').doc(context.sender);
  const userDoc = await userRef.get();
  const lastWork = userDoc.data()?.lastWork || 0;
  const now = Date.now();
  const cooldown = 60 * 60 * 1000; // 1 hour

  if (now - lastWork < cooldown) {
    const remaining = Math.ceil((cooldown - (now - lastWork)) / 1000 / 60);
    return sock.sendMessage(context.from, {
      text: `❌ You're tired! Rest for ${remaining} minutes.`
    }, { quoted: msg });
  }

  const jobs = ['Developer', 'Designer', 'Trader', 'Miner', 'Hunter'];
  const job = jobs[Math.floor(Math.random() * jobs.length)];
  const earned = Math.floor(Math.random() * 500) + 200;

  await userRef.update({
    wallet: db.FieldValue.increment(earned),
    lastWork: now
  });

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗪𝗢𝗥𝗞 𖣔━━╮
│                       
│  💼 𝙔𝙤𝙪 𝙬𝙤𝙧𝙠𝙚𝙙 𝙖𝙨 𝙖 ${job}
│  
│  💰 𝙀𝙖𝙧𝙣𝙚𝙙: ${earned} 𝙘𝙤𝙞𝙣𝙨
│  
│  💜 𝙂𝙧𝙚𝙖𝙩 𝙟𝙤𝙗!
│
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

const rob = async (sock, msg, args, context) => {
  const user = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
  if (!user) return sock.sendMessage(context.from, { text: '❌ Mention a user!' }, { quoted: msg });

  const robberRef = db.collection('users').doc(context.sender);
  const victimRef = db.collection('users').doc(user);
  
  const robberDoc = await robberRef.get();
  const victimDoc = await victimRef.get();

  const victimWallet = victimDoc.data()?.wallet || 0;
  
  if (victimWallet < 100) {
    return sock.sendMessage(context.from, { text: '❌ Target has less than 100 coins!' }, { quoted: msg });
  }

  const success = Math.random() > 0.5;
  
  if (success) {
    const stolen = Math.floor(victimWallet * 0.3);
    await robberRef.update({ wallet: db.FieldValue.increment(stolen) });
    await victimRef.update({ wallet: victimWallet - stolen });

    await sock.sendMessage(context.from, {
      text: `╭━━𖣔 𝗥𝗢𝗕𝗕𝗘𝗥𝗬 𖣔━━╮
│                       
│  ✅ 𝙎𝙪𝙘𝙘𝙚𝙨𝙨𝙛𝙪𝙡 𝙍𝙤𝙗!
│  
│  💰 𝙎𝙩𝙤𝙡𝙚𝙣: ${stolen} 𝙘𝙤𝙞𝙣𝙨
│  🎯 𝙁𝙧𝙤𝙢: @${user.split('@')[0]}
│  
│  💜 𝙔𝙤𝙪 𝙜𝙤𝙩 𝙖𝙬𝙖𝙮!
│
╰━━━━━━━━━━━━━━━━━━━╯`,
      mentions: [user]
    }, { quoted: msg });
  } else {
    const fine = 500;
    await robberRef.update({ wallet: db.FieldValue.increment(-fine) });

    await sock.sendMessage(context.from, {
      text: `╭━━𖣔 𝗥𝗢𝗕𝗕𝗘𝗥𝗬 𖣔━━╮
│                       
│  ❌ 𝙁𝙖𝙞𝙡𝙚𝙙 𝙍𝙤𝙗!
│  
│  💸 𝙁𝙞𝙣𝙚: ${fine} 𝙘𝙤𝙞𝙣𝙨
│  🚔 𝘾𝙖𝙪𝙜𝙝𝙩 𝙗𝙮 𝙥𝙤𝙡𝙞𝙘𝙚!
│  
│  💜 𝘽𝙚𝙩𝙩𝙚𝙧 𝙡𝙪𝙘𝙠 𝙣𝙚𝙭𝙩 𝙩𝙞𝙢𝙚!
│
╰━━━━━━━━━━━━━━━━━━━╯`
    }, { quoted: msg });
  }
};

module.exports = {
  balance,
  deposit,
  withdraw,
  send,
  daily,
  weekly,
  monthly,
  inventory,
  work,
  rob
};
