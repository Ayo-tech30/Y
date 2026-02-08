const { db } = require('../../firebase');

const gamble = async (sock, msg, args, context) => {
  const amount = parseInt(args[0]);
  if (!amount || amount < 1) {
    return sock.sendMessage(context.from, { text: '❌ Invalid amount!' }, { quoted: msg });
  }

  const userRef = db.collection('users').doc(context.sender);
  const userDoc = await userRef.get();
  const wallet = userDoc.data()?.wallet || 0;

  if (wallet < amount) {
    return sock.sendMessage(context.from, { text: '❌ Insufficient balance!' }, { quoted: msg });
  }

  const win = Math.random() > 0.5;
  const result = win ? amount * 2 : -amount;

  await userRef.update({ wallet: wallet + result });

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 ${win ? '𝗪𝗜𝗡' : '𝗟𝗢𝗦𝗘'} 𖣔━━╮
│                       
│  🎲 𝙂𝙖𝙢𝙗𝙡𝙚 ${win ? '𝙒𝙤𝙣!' : '𝙇𝙤𝙨𝙩!'}
│  
│  💰 ${win ? '+' : ''}${result} 𝙘𝙤𝙞𝙣𝙨
│  💵 𝙉𝙚𝙬 𝘽𝙖𝙡𝙖𝙣𝙘𝙚: ${wallet + result}
│  
│  💜 ${win ? 'Lucky!' : 'Try again!'}
│
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

const slots = async (sock, msg, args, context) => {
  const amount = parseInt(args[0]);
  if (!amount || amount < 1) {
    return sock.sendMessage(context.from, { text: '❌ Invalid amount!' }, { quoted: msg });
  }

  const userRef = db.collection('users').doc(context.sender);
  const userDoc = await userRef.get();
  const wallet = userDoc.data()?.wallet || 0;

  if (wallet < amount) {
    return sock.sendMessage(context.from, { text: '❌ Insufficient balance!' }, { quoted: msg });
  }

  const symbols = ['🍒', '🍋', '🍊', '🍇', '💎', '7️⃣'];
  const slot1 = symbols[Math.floor(Math.random() * symbols.length)];
  const slot2 = symbols[Math.floor(Math.random() * symbols.length)];
  const slot3 = symbols[Math.floor(Math.random() * symbols.length)];

  let multiplier = 0;
  if (slot1 === slot2 && slot2 === slot3) {
    multiplier = slot1 === '💎' ? 10 : slot1 === '7️⃣' ? 7 : 5;
  } else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
    multiplier = 2;
  }

  const winnings = multiplier > 0 ? amount * multiplier : -amount;
  await userRef.update({ wallet: wallet + winnings });

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗦𝗟𝗢𝗧𝗦 𖣔━━╮
│                       
│  🎰 [ ${slot1} | ${slot2} | ${slot3} ]
│  
│  ${multiplier > 0 ? `✅ 𝙒𝙞𝙣 ${multiplier}x!` : '❌ 𝙇𝙤𝙨𝙩!'}
│  💰 ${winnings > 0 ? '+' : ''}${winnings} 𝙘𝙤𝙞𝙣𝙨
│  
│  💜 𝘽𝙖𝙡𝙖𝙣𝙘𝙚: ${wallet + winnings}
│
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

const coinflip = async (sock, msg, args, context) => {
  const amount = parseInt(args[0]);
  const choice = args[1]?.toLowerCase();
  
  if (!amount || !choice || !['heads', 'tails'].includes(choice)) {
    return sock.sendMessage(context.from, { text: '❌ Usage: .coinflip <amount> <heads/tails>' }, { quoted: msg });
  }

  const userRef = db.collection('users').doc(context.sender);
  const userDoc = await userRef.get();
  const wallet = userDoc.data()?.wallet || 0;

  if (wallet < amount) {
    return sock.sendMessage(context.from, { text: '❌ Insufficient balance!' }, { quoted: msg });
  }

  const result = Math.random() > 0.5 ? 'heads' : 'tails';
  const win = result === choice;
  const winnings = win ? amount : -amount;

  await userRef.update({ wallet: wallet + winnings });

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗖𝗢𝗜𝗡𝗙𝗟𝗜𝗣 𖣔━━╮
│                       
│  🪙 ${result.toUpperCase()}
│  
│  ${win ? '✅ 𝙔𝙤𝙪 𝙬𝙤𝙣!' : '❌ 𝙔𝙤𝙪 𝙡𝙤𝙨𝙩!'}
│  💰 ${winnings > 0 ? '+' : ''}${winnings} 𝙘𝙤𝙞𝙣𝙨
│  
│  💜 𝘽𝙖𝙡𝙖𝙣𝙘𝙚: ${wallet + winnings}
│
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

// Simplified versions of other games
const roulette = async (sock, msg, args, context) => {
  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗥𝗢𝗨𝗟𝗘𝗧𝗧𝗘 𖣔━━╮
│  🎡 Spin the wheel!
│  💜 Feature coming soon
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

const blackjack = async (sock, msg, args, context) => {
  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗕𝗟𝗔𝗖𝗞𝗝𝗔𝗖𝗞 𖣔━━╮
│  🃏 Card game!
│  💜 Feature coming soon
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

const dice = async (sock, msg, args, context) => {
  const amount = parseInt(args[0]);
  if (!amount || amount < 1) {
    return sock.sendMessage(context.from, { text: '❌ Invalid amount!' }, { quoted: msg });
  }

  const userRef = db.collection('users').doc(context.sender);
  const userDoc = await userRef.get();
  const wallet = userDoc.data()?.wallet || 0;

  if (wallet < amount) {
    return sock.sendMessage(context.from, { text: '❌ Insufficient balance!' }, { quoted: msg });
  }

  const roll = Math.floor(Math.random() * 6) + 1;
  const win = roll >= 4;
  const winnings = win ? amount : -amount;

  await userRef.update({ wallet: wallet + winnings });

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗗𝗜𝗖𝗘 𖣔━━╮
│                       
│  🎲 𝙍𝙤𝙡𝙡𝙚𝙙: ${roll}
│  
│  ${win ? '✅ 𝙒𝙞𝙣 (4+)!' : '❌ 𝙇𝙤𝙨𝙩 (<4)'}
│  💰 ${winnings > 0 ? '+' : ''}${winnings} 𝙘𝙤𝙞𝙣𝙨
│  
│  💜 𝘽𝙖𝙡𝙖𝙣𝙘𝙚: ${wallet + winnings}
│
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

const lottery = async (sock, msg, args, context) => {
  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗟𝗢𝗧𝗧𝗘𝗥𝗬 𖣔━━╮
│  🎫 Buy a ticket!
│  💜 Feature coming soon
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

const jackpot = async (sock, msg, args, context) => {
  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗝𝗔𝗖𝗞𝗣𝗢𝗧 𖣔━━╮
│  💎 Big prize pool!
│  💜 Feature coming soon
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

const crash = async (sock, msg, args, context) => {
  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗖𝗥𝗔𝗦𝗛 𖣔━━╮
│  📈 Multiplier game!
│  💜 Feature coming soon
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

const race = async (sock, msg, args, context) => {
  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗥𝗔𝗖𝗘 𖣔━━╮
│  🏁 Racing game!
│  💜 Feature coming soon
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

const wheel = async (sock, msg, args, context) => {
  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗪𝗛𝗘𝗘𝗟 𖣔━━╮
│  🎡 Spin to win!
│  💜 Feature coming soon
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

const poker = async (sock, msg, args, context) => {
  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗣𝗢𝗞𝗘𝗥 𖣔━━╮
│  🃏 Card poker!
│  💜 Feature coming soon
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

const mines = async (sock, msg, args, context) => {
  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗠𝗜𝗡𝗘𝗦 𖣔━━╮
│  💣 Minesweeper!
│  💜 Feature coming soon
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

const plinko = async (sock, msg, args, context) => {
  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗣𝗟𝗜𝗡𝗞𝗢 𖣔━━╮
│  🎯 Drop the ball!
│  💜 Feature coming soon
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

const limbo = async (sock, msg, args, context) => {
  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗟𝗜𝗠𝗕𝗢 𖣔━━╮
│  📊 Set your target!
│  💜 Feature coming soon
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

module.exports = {
  gamble,
  slots,
  roulette,
  blackjack,
  coinflip,
  dice,
  lottery,
  jackpot,
  crash,
  race,
  wheel,
  poker,
  mines,
  plinko,
  limbo
};
