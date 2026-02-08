const { db } = require('../../firebase');
const { downloadMediaMessage } = require('@whiskeysockets/baileys');

// Card spawn system
const activeCardSpawns = new Map();

const myCards = async (sock, msg, args, context) => {
  const userRef = db.collection('users').doc(context.sender);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    return sock.sendMessage(context.from, { text: '❌ Please register first! Use .register' }, { quoted: msg });
  }

  const cards = userDoc.data().cards || [];
  
  if (cards.length === 0) {
    return sock.sendMessage(context.from, {
      text: `╭━━𖣔 𝗠𝗬 𝗖𝗔𝗥𝗗𝗦 𖣔━━╮
│                       
│  🎴 𝙉𝙤 𝙘𝙖𝙧𝙙𝙨 𝙮𝙚𝙩!
│  
│  💡 𝙐𝙨𝙚 .𝙧𝙤𝙡𝙡𝙘𝙖𝙧𝙙 𝙩𝙤 𝙜𝙚𝙩 𝙘𝙖𝙧𝙙𝙨
│  
│  💜 𝙎𝙩𝙖𝙧𝙩 𝙘𝙤𝙡𝙡𝙚𝙘𝙩𝙞𝙣𝙜!
│
╰━━━━━━━━━━━━━━━━━━━╯`
    }, { quoted: msg });
  }

  let cardList = `╭━━𖣔 𝗠𝗬 𝗖𝗔𝗥𝗗𝗦 𖣔━━╮
│                       
│  🎴 𝙏𝙤𝙩𝙖𝙡 𝘾𝙖𝙧𝙙𝙨: ${cards.length}
│
╰━━━━━━━━━━━━━━━━━━━╯

📋 𝘾𝙖𝙧𝙙 𝙇𝙞𝙨𝙩
━━━━━━━━━━━━━━━\n`;

  cards.forEach((card, i) => {
    cardList += `᯽ ${i + 1}. ${card.name} ⭐${card.rarity}\n`;
  });

  cardList += `\n━━━━━━━━━━━━━━━\n💜 𝙐𝙨𝙚 .𝙜𝙚𝙩 <𝙞𝙙> 𝙩𝙤 𝙫𝙞𝙚𝙬`;

  await sock.sendMessage(context.from, { text: cardList }, { quoted: msg });
};

const getCard = async (sock, msg, args, context) => {
  const cardId = parseInt(args[0]);
  if (!cardId) {
    return sock.sendMessage(context.from, { text: '❌ Please provide card ID! Usage: .get <id>' }, { quoted: msg });
  }

  const userRef = db.collection('users').doc(context.sender);
  const userDoc = await userRef.get();
  const cards = userDoc.data()?.cards || [];

  if (cardId < 1 || cardId > cards.length) {
    return sock.sendMessage(context.from, { text: '❌ Invalid card ID!' }, { quoted: msg });
  }

  const card = cards[cardId - 1];
  const response = `╭━━𖣔 𝗖𝗔𝗥𝗗 𝗜𝗡𝗙𝗢 𖣔━━╮
│                       
│  🎴 ${card.name}
│  
│  ⭐ 𝙍𝙖𝙧𝙞𝙩𝙮: ${card.rarity}/5
│  💎 𝙑𝙖𝙡𝙪𝙚: ${card.value} 𝙘𝙤𝙞𝙣𝙨
│  🆔 𝙄𝘿: #${card.id}
│  
│  💜 ${card.description || 'A rare collectible'}
│
╰━━━━━━━━━━━━━━━━━━━╯`;

  await sock.sendMessage(context.from, { text: response }, { quoted: msg });
};

const deck = async (sock, msg, args, context) => {
  const response = `╭━━𖣔 𝗖𝗔𝗥𝗗 𝗗𝗘𝗖𝗞 𖣔━━╮
│                       
│  🎴 𝘼𝙫𝙖𝙞𝙡𝙖𝙗𝙡𝙚 𝘾𝙖𝙧𝙙𝙨
│  
│  ⭐ 𝘾𝙤𝙢𝙢𝙤𝙣 (1★)
│  ⭐⭐ 𝙐𝙣𝙘𝙤𝙢𝙢𝙤𝙣 (2★)
│  ⭐⭐⭐ 𝙍𝙖𝙧𝙚 (3★)
│  ⭐⭐⭐⭐ 𝙀𝙥𝙞𝙘 (4★)
│  ⭐⭐⭐⭐⭐ 𝙇𝙚𝙜𝙚𝙣𝙙𝙖𝙧𝙮 (5★)
│  
│  💜 𝙐𝙨𝙚 .𝙧𝙤𝙡𝙡𝙘𝙖𝙧𝙙 𝙩𝙤 𝙜𝙚𝙩!
│
╰━━━━━━━━━━━━━━━━━━━╯`;

  await sock.sendMessage(context.from, { text: response }, { quoted: msg });
};

const giveCard = async (sock, msg, args, context) => {
  const user = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
  if (!user) return sock.sendMessage(context.from, { text: '❌ Mention a user!' }, { quoted: msg });

  const cardId = parseInt(args[1]);
  if (!cardId) return sock.sendMessage(context.from, { text: '❌ Provide card ID!' }, { quoted: msg });

  const senderRef = db.collection('users').doc(context.sender);
  const receiverRef = db.collection('users').doc(user);
  
  const senderDoc = await senderRef.get();
  const cards = senderDoc.data()?.cards || [];

  if (cardId < 1 || cardId > cards.length) {
    return sock.sendMessage(context.from, { text: '❌ Invalid card ID!' }, { quoted: msg });
  }

  const card = cards[cardId - 1];
  cards.splice(cardId - 1, 1);

  await senderRef.update({ cards });
  await receiverRef.update({ cards: db.FieldValue.arrayUnion(card) });

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗖𝗔𝗥𝗗 𝗚𝗜𝗩𝗘𝗡 𖣔━━╮
│                       
│  🎁 𝙏𝙧𝙖𝙣𝙨𝙛𝙚𝙧 𝘾𝙤𝙢𝙥𝙡𝙚𝙩𝙚!
│  
│  🎴 ${card.name} ⭐${card.rarity}
│  👤 𝙁𝙧𝙤𝙢: @${context.sender.split('@')[0]}
│  👤 𝙏𝙤: @${user.split('@')[0]}
│  
│  💜 𝙂𝙚𝙣𝙚𝙧𝙤𝙪𝙨!
│
╰━━━━━━━━━━━━━━━━━━━╯`,
    mentions: [context.sender, user]
  }, { quoted: msg });
};

const sellCard = async (sock, msg, args, context) => {
  const cardId = parseInt(args[0]);
  if (!cardId) return sock.sendMessage(context.from, { text: '❌ Provide card ID!' }, { quoted: msg });

  const userRef = db.collection('users').doc(context.sender);
  const userDoc = await userRef.get();
  const cards = userDoc.data()?.cards || [];
  const wallet = userDoc.data()?.wallet || 0;

  if (cardId < 1 || cardId > cards.length) {
    return sock.sendMessage(context.from, { text: '❌ Invalid card ID!' }, { quoted: msg });
  }

  const card = cards[cardId - 1];
  cards.splice(cardId - 1, 1);

  await userRef.update({ 
    cards,
    wallet: wallet + card.value
  });

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗖𝗔𝗥𝗗 𝗦𝗢𝗟𝗗 𖣔━━╮
│                       
│  💰 𝙎𝙖𝙡𝙚 𝘾𝙤𝙢𝙥𝙡𝙚𝙩𝙚!
│  
│  🎴 ${card.name} ⭐${card.rarity}
│  💵 𝙋𝙧𝙞𝙘𝙚: ${card.value} 𝙘𝙤𝙞𝙣𝙨
│  
│  💜 𝙉𝙚𝙬 𝙗𝙖𝙡𝙖𝙣𝙘𝙚: ${wallet + card.value}
│
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

const auction = async (sock, msg, args, context) => {
  const response = `╭━━𖣔 𝗔𝗨𝗖𝗧𝗜𝗢𝗡 𖣔━━╮
│                       
│  🔨 𝘾𝙖𝙧𝙙 𝘼𝙪𝙘𝙩𝙞𝙤𝙣
│  
│  🚧 𝙁𝙚𝙖𝙩𝙪𝙧𝙚 𝘾𝙤𝙢𝙞𝙣𝙜 𝙎𝙤𝙤𝙣!
│  
│  💜 𝙎𝙩𝙖𝙮 𝙩𝙪𝙣𝙚𝙙
│
╰━━━━━━━━━━━━━━━━━━━╯`;

  await sock.sendMessage(context.from, { text: response }, { quoted: msg });
};

const bid = async (sock, msg, args, context) => {
  const response = `╭━━𖣔 𝗕𝗜𝗗𝗗𝗜𝗡𝗚 𖣔━━╮
│                       
│  💰 𝙋𝙡𝙖𝙘𝙚 𝘽𝙞𝙙
│  
│  🚧 𝙁𝙚𝙖𝙩𝙪𝙧𝙚 𝘾𝙤𝙢𝙞𝙣𝙜 𝙎𝙤𝙤𝙣!
│  
│  💜 𝙎𝙩𝙖𝙮 𝙩𝙪𝙣𝙚𝙙
│
╰━━━━━━━━━━━━━━━━━━━╯`;

  await sock.sendMessage(context.from, { text: response }, { quoted: msg });
};

const rollCard = async (sock, msg, args, context) => {
  const userRef = db.collection('users').doc(context.sender);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    return sock.sendMessage(context.from, { text: '❌ Please register first! Use .register' }, { quoted: msg });
  }

  const wallet = userDoc.data()?.wallet || 0;
  const cost = 500;

  if (wallet < cost) {
    return sock.sendMessage(context.from, {
      text: `╭━━𖣔 𝗜𝗡𝗦𝗨𝗙𝗙𝗜𝗖𝗜𝗘𝗡𝗧 𖣔━━╮
│                       
│  ❌ 𝙉𝙤𝙩 𝙚𝙣𝙤𝙪𝙜𝙝 𝙘𝙤𝙞𝙣𝙨!
│  
│  💰 𝙉𝙚𝙚𝙙: ${cost} 𝙘𝙤𝙞𝙣𝙨
│  💵 𝙃𝙖𝙫𝙚: ${wallet} 𝙘𝙤𝙞𝙣𝙨
│  
│  💜 𝙀𝙖𝙧𝙣 𝙢𝙤𝙧𝙚 𝙛𝙞𝙧𝙨𝙩!
│
╰━━━━━━━━━━━━━━━━━━━╯`
    }, { quoted: msg });
  }

  // Generate random card
  const rarities = [
    { stars: 1, chance: 50, value: 100 },
    { stars: 2, chance: 30, value: 300 },
    { stars: 3, chance: 15, value: 800 },
    { stars: 4, chance: 4, value: 2000 },
    { stars: 5, chance: 1, value: 5000 }
  ];

  const rand = Math.random() * 100;
  let cumulative = 0;
  let selectedRarity = rarities[0];

  for (const rarity of rarities) {
    cumulative += rarity.chance;
    if (rand <= cumulative) {
      selectedRarity = rarity;
      break;
    }
  }

  const cardNames = ['Dragon', 'Phoenix', 'Warrior', 'Mage', 'Assassin', 'Knight', 'Sage', 'Demon', 'Angel', 'Beast'];
  const randomName = cardNames[Math.floor(Math.random() * cardNames.length)];

  const newCard = {
    id: Date.now().toString(),
    name: randomName,
    rarity: selectedRarity.stars,
    value: selectedRarity.value,
    description: `A ${selectedRarity.stars}★ ${randomName} card`
  };

  await userRef.update({
    wallet: wallet - cost,
    cards: db.FieldValue.arrayUnion(newCard)
  });

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗖𝗔𝗥𝗗 𝗥𝗢𝗟𝗟𝗘𝗗 𖣔━━╮
│                       
│  🎴 𝙉𝙚𝙬 𝘾𝙖𝙧𝙙!
│  
│  ✨ ${newCard.name}
│  ${'⭐'.repeat(selectedRarity.stars)} (${selectedRarity.stars}★)
│  💎 𝙑𝙖𝙡𝙪𝙚: ${selectedRarity.value}
│  
│  💜 𝘼𝙙𝙙𝙚𝙙 𝙩𝙤 𝙮𝙤𝙪𝙧 𝙘𝙤𝙡𝙡𝙚𝙘𝙩𝙞𝙤𝙣!
│
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

const toggleCards = async (sock, msg, args, context) => {
  if (!context.isAdmin) return sock.sendMessage(context.from, { text: '❌ Only admins can use this!' }, { quoted: msg });

  const status = args[0]?.toLowerCase();
  if (status !== 'on' && status !== 'off') {
    return sock.sendMessage(context.from, { text: '❌ Use: .cards on/off' }, { quoted: msg });
  }

  const groupRef = db.collection('groups').doc(context.from);
  await groupRef.set({ cardsEnabled: status === 'on' }, { merge: true });

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗖𝗔𝗥𝗗𝗦 𝗦𝗬𝗦𝗧𝗘𝗠 𖣔━━╮
│                       
│  ✅ 𝙎𝙚𝙩𝙩𝙞𝙣𝙜 𝙐𝙥𝙙𝙖𝙩𝙚𝙙!
│  
│  ${status === 'on' ? '✅ Card spawning enabled' : '❌ Card spawning disabled'}
│  
│  💜 ${status === 'on' ? 'Cards will spawn randomly' : 'No card spawns'}
│
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

module.exports = {
  myCards,
  getCard,
  deck,
  giveCard,
  sellCard,
  auction,
  bid,
  rollCard,
  toggleCards
};
