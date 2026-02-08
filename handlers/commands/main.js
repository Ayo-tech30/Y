const { db } = require('../../firebase');
const moment = require('moment-timezone');

const menu = async (sock, msg, args, context) => {
  const menuText = `╭━━𖣔 𝗡𝗘𝗫𝗢𝗥𝗔 𖣔━━╮
│  ✦ 𝙋𝙧𝙚𝙛𝙞𝙭   :  .
│  ✦ 𝘽𝙤𝙩 𝙉𝙖𝙢𝙚 :  𝗩𝗶𝗼𝗹𝗲𝘁
│  ✦ 𝙊𝙬𝙣𝙚𝙧    :  𝗞𝘆𝗻𝘅
│  ✦ 𝙎𝙩𝙖𝙩𝙪𝙨   :  𝙊𝙣𝙡𝙞𝙣𝙚 ✓
│  ✦ 𝘿𝘽        :  Firebase 🔥
╰━━━━━━━━━━━━━╯

⚙️ 𝙈𝘼𝙄𝙉 𝙈𝙀𝙉𝙐 ⚙️
━━━━━━━━━━━━━━
᯽ .𝙢𝙚𝙣𝙪
᯽ .𝙥𝙞𝙣𝙜
᯽ .𝙖𝙡𝙞𝙫𝙚
᯽ .𝙖𝙛𝙠
᯽ .𝙧𝙚𝙜𝙞𝙨𝙩𝙚𝙧 | .𝙧𝙚𝙜
᯽ .𝙡𝙚𝙖𝙙𝙚𝙧𝙗𝙤𝙖𝙧𝙙 | .𝙡𝙗
᯽ .𝙢𝙖𝙧𝙠𝙚𝙩
᯽ .𝙢𝙪𝙜𝙚𝙣

👤 𝙋𝙍𝙊𝙁𝙄𝙇𝙀 𝙈𝙀𝙉𝙐 👤
━━━━━━━━━━━━━━
᯽ .𝙥 | .𝙥𝙧𝙤𝙛𝙞𝙡𝙚 [@𝙪𝙨𝙚𝙧]
᯽ .𝙨𝙚𝙩𝙥𝙧𝙤𝙛𝙞𝙡𝙚 | .𝙨𝙚𝙩𝙥
᯽ .𝙨𝙚𝙩𝙥𝙧𝙤𝙛𝙞𝙡𝙚𝙦𝙪𝙤𝙩𝙚
᯽ .𝙨𝙚𝙩𝙖𝙜𝙚 <𝙣𝙪𝙢>
᯽ .𝙨𝙚𝙩𝙣𝙖𝙢𝙚 <𝙣𝙖𝙢𝙚>

🛡️ 𝙂𝙍𝙊𝙐𝙋 𝘼𝘿𝙈𝙄𝙉 🛡️
━━━━━━━━━━━━━━
᯽ .𝙥𝙧𝙤𝙢𝙤𝙩𝙚 @𝙪𝙨𝙚𝙧
᯽ .𝙙𝙚𝙢𝙤𝙩𝙚 @𝙪𝙨𝙚𝙧
᯽ .𝙢𝙪𝙩𝙚 @𝙪𝙨𝙚𝙧
᯽ .𝙪𝙣𝙢𝙪𝙩𝙚 @𝙪𝙨𝙚𝙧
᯽ .𝙬𝙖𝙧𝙣 @𝙪𝙨𝙚𝙧
᯽ .𝙬𝙖𝙧𝙣𝙘𝙤𝙪𝙣𝙩 @𝙪𝙨𝙚𝙧
᯽ .𝙧𝙚𝙨𝙚𝙩𝙬𝙖𝙧𝙣 @𝙪𝙨𝙚𝙧
᯽ .𝙠𝙞𝙘𝙠 @𝙪𝙨𝙚𝙧
᯽ .𝙙𝙚𝙡𝙚𝙩𝙚
᯽ .𝙩𝙖𝙜𝙖𝙡𝙡
᯽ .𝙝𝙞𝙙𝙚𝙩𝙖𝙜
᯽ .𝙬𝙚𝙡𝙘𝙤𝙢𝙚 <𝙤𝙣/𝙤𝙛𝙛>
᯽ .𝙜𝙤𝙤𝙙𝙗𝙮𝙚 <𝙤𝙣/𝙤𝙛𝙛>
᯽ .𝙖𝙣𝙩𝙞𝙡𝙞𝙣𝙠 <𝙤𝙣/𝙤𝙛𝙛>
᯽ .𝙜𝙧𝙤𝙪𝙥𝙞𝙣𝙛𝙤

🎴 𝘾𝘼𝙍𝘿𝙎 𝙈𝙀𝙉𝙐 🎴
━━━━━━━━━━━━━━
᯽ .𝙢𝙮𝙘𝙖𝙧𝙙𝙨
᯽ .𝙜𝙚𝙩 <𝙞𝙙>
᯽ .𝙙𝙚𝙘𝙠
᯽ .𝙜𝙞𝙫𝙚𝙘𝙖𝙧𝙙 @𝙪𝙨𝙚𝙧
᯽ .𝙨𝙚𝙡𝙡𝙘𝙖𝙧𝙙
᯽ .𝙖𝙪𝙘𝙩𝙞𝙤𝙣
᯽ .𝙗𝙞𝙙
᯽ .𝙧𝙤𝙡𝙡𝙘𝙖𝙧𝙙
᯽ .𝙘𝙖𝙧𝙙𝙨 <𝙤𝙣/𝙤𝙛𝙛>

💰 𝙀𝘾𝙊𝙉𝙊𝙈𝙔 𝙈𝙀𝙉𝙐 💰
━━━━━━━━━━━━━━
᯽ .𝙖𝙘𝙘𝙗𝙖𝙡 [@𝙪𝙨𝙚𝙧]
᯽ .𝙙𝙚𝙥𝙤𝙨𝙞𝙩 <𝙖𝙢𝙤𝙪𝙣𝙩>
᯽ .𝙬𝙞𝙩𝙝𝙙𝙧𝙖𝙬 <𝙖𝙢𝙤𝙪𝙣𝙩>
᯽ .𝙨𝙚𝙣𝙙 @𝙪𝙨𝙚𝙧 <𝙖𝙢𝙤𝙪𝙣𝙩>
᯽ .𝙙𝙖𝙞𝙡𝙮
᯽ .𝙬𝙚𝙚𝙠𝙡𝙮
᯽ .𝙢𝙤𝙣𝙩𝙝𝙡𝙮
᯽ .𝙞𝙣𝙫
᯽ .𝙬𝙤𝙧𝙠
᯽ .𝙧𝙤𝙗 @𝙪𝙨𝙚𝙧

🎰 𝙂𝘼𝙈𝘽𝙇𝙄𝙉𝙂 𝙈𝙀𝙉𝙐 🎰
━━━━━━━━━━━━━━
᯽ .𝙜𝙖𝙢𝙗𝙡𝙚 <𝙖𝙢𝙤𝙪𝙣𝙩>
᯽ .𝙨𝙡𝙤𝙩𝙨 <𝙖𝙢𝙤𝙪𝙣𝙩>
᯽ .𝙧𝙤𝙪𝙡𝙚𝙩𝙩𝙚 <𝙗𝙚𝙩> <𝙘𝙤𝙡𝙤𝙧/𝙣𝙪𝙢𝙗𝙚𝙧>
᯽ .𝙗𝙡𝙖𝙘𝙠𝙟𝙖𝙘𝙠 <𝙖𝙢𝙤𝙪𝙣𝙩>
᯽ .𝙘𝙤𝙞𝙣𝙛𝙡𝙞𝙥 <𝙖𝙢𝙤𝙪𝙣𝙩> <𝙝𝙚𝙖𝙙𝙨/𝙩𝙖𝙞𝙡𝙨>
᯽ .𝙙𝙞𝙘𝙚 <𝙖𝙢𝙤𝙪𝙣𝙩>
᯽ .𝙡𝙤𝙩𝙩𝙚𝙧𝙮
᯽ .𝙟𝙖𝙘𝙠𝙥𝙤𝙩
᯽ .𝙘𝙧𝙖𝙨𝙝 <𝙖𝙢𝙤𝙪𝙣𝙩>
᯽ .𝙧𝙖𝙘𝙚 <𝙖𝙢𝙤𝙪𝙣𝙩>
᯽ .𝙬𝙝𝙚𝙚𝙡 <𝙖𝙢𝙤𝙪𝙣𝙩>
᯽ .𝙥𝙤𝙠𝙚𝙧 <𝙖𝙢𝙤𝙪𝙣𝙩>
᯽ .𝙢𝙞𝙣𝙚𝙨 <𝙖𝙢𝙤𝙪𝙣𝙩>
᯽ .𝙥𝙡𝙞𝙣𝙠𝙤 <𝙖𝙢𝙤𝙪𝙣𝙩>
᯽ .𝙡𝙞𝙢𝙗𝙤 <𝙖𝙢𝙤𝙪𝙣𝙩> <𝙢𝙪𝙡𝙩𝙞𝙥𝙡𝙞𝙚𝙧>

🔍 𝙎𝙀𝘼𝙍𝘾𝙃 𝙈𝙀𝙉𝙐 🔍
━━━━━━━━━━━━━━
᯽ .𝙜𝙥𝙩 <𝙦𝙪𝙚𝙧𝙮>
᯽ .𝙖𝙞 <𝙦𝙪𝙚𝙧𝙮>
᯽ .𝙜𝙤𝙤𝙜𝙡𝙚 <𝙦𝙪𝙚𝙧𝙮>

🖼️ 𝙄𝙈𝘼𝙂𝙀 𝙈𝙀𝙉𝙐 🖼️
━━━━━━━━━━━━━━
᯽ .𝙨𝙩𝙞𝙘𝙠𝙚𝙧
᯽ .𝙗𝙡𝙪𝙧
᯽ .𝙧𝙚𝙢𝙤𝙫𝙚𝙗𝙜

🌟 𝙁𝙐𝙉 𝙈𝙀𝙉𝙐 🌟
━━━━━━━━━━━━━━
᯽ .𝙢𝙖𝙩𝙘𝙝 [@𝙪𝙨𝙚𝙧]
᯽ .𝙧𝙤𝙖𝙨𝙩 @𝙪𝙨𝙚𝙧
᯽ .𝙨𝙞𝙢𝙥 @𝙪𝙨𝙚𝙧

🪷 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿 𝙈𝙀𝙉𝙐 🪷
━━━━━━━━━━━━━━
᯽ .𝙥𝙡𝙖𝙮 <𝙨𝙤𝙣𝙜>
᯽ .𝙞𝙣𝙨𝙩𝙖𝙜𝙧𝙖𝙢 <𝙪𝙧𝙡>
᯽ .𝙩𝙞𝙠𝙩𝙤𝙠 <𝙪𝙧𝙡>
━━━━━━━━━━━━━━

💜 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗡𝗲𝘅𝗼𝗿𝗮`;

  await sock.sendMessage(context.from, { text: menuText }, { quoted: msg });
};

const ping = async (sock, msg, args, context) => {
  const start = Date.now();
  const sent = await sock.sendMessage(context.from, { text: '🏓 𝙋𝙞𝙣𝙜𝙞𝙣𝙜...' }, { quoted: msg });
  const end = Date.now();
  
  const response = `╭━━𖣔 𝗣𝗜𝗡𝗚 𖣔━━╮
│                       
│  ⚡ 𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙚 𝙏𝙞𝙢𝙚
│  
│  🏓 ${end - start}𝙢𝙨
│  
│  💜 𝙎𝙩𝙖𝙩𝙪𝙨: 𝙊𝙣𝙡𝙞𝙣𝙚 ✓
│
╰━━━━━━━━━━━━━━━━━━━╯`;

  await sock.sendMessage(context.from, { text: response, edit: sent.key });
};

const alive = async (sock, msg, args, context) => {
  const uptime = process.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);

  const response = `╭━━𖣔 𝗩𝗜𝗢𝗟𝗘𝗧 𖣔━━╮
│                       
│  🤖 𝘽𝙤𝙩 𝙎𝙩𝙖𝙩𝙪𝙨
│  
│  ✅ 𝙊𝙣𝙡𝙞𝙣𝙚 & 𝙍𝙚𝙖𝙙𝙮
│  ⏱️ 𝙐𝙥𝙩𝙞𝙢𝙚: ${hours}h ${minutes}m ${seconds}s
│  🔥 𝘿𝘽: Firebase
│  👑 𝙊𝙬𝙣𝙚𝙧: 𝗞𝘆𝗻𝘅
│  
│  💜 𝙏𝙝𝙖𝙣𝙠𝙨 𝙛𝙤𝙧 𝙪𝙨𝙞𝙣𝙜 𝙑𝙞𝙤𝙡𝙚𝙩!
│
╰━━━━━━━━━━━━━━━━━━━╯`;

  await sock.sendMessage(context.from, { text: response }, { quoted: msg });
};

const afk = async (sock, msg, args, context) => {
  const reason = args.join(' ') || 'AFK';
  const userRef = db.collection('users').doc(context.sender);
  
  await userRef.set({
    afk: true,
    afkReason: reason,
    afkTime: Date.now()
  }, { merge: true });

  const response = `╭━━𖣔 𝗔𝗙𝗞 𝗠𝗢𝗗𝗘 𖣔━━╮
│                       
│  😴 𝙔𝙤𝙪'𝙧𝙚 𝙣𝙤𝙬 𝘼𝙁𝙆
│  
│  📝 𝙍𝙚𝙖𝙨𝙤𝙣: ${reason}
│  
│  💜 𝙄'𝙡𝙡 𝙣𝙤𝙩𝙞𝙛𝙮 𝙤𝙩𝙝𝙚𝙧𝙨!
│
╰━━━━━━━━━━━━━━━━━━━╯`;

  await sock.sendMessage(context.from, { text: response }, { quoted: msg });
};

const register = async (sock, msg, args, context) => {
  const userRef = db.collection('users').doc(context.sender);
  const userDoc = await userRef.get();

  if (userDoc.exists && userDoc.data().registered) {
    return sock.sendMessage(context.from, {
      text: `╭━━𖣔 𝗥𝗘𝗚𝗜𝗦𝗧𝗥𝗔𝗧𝗜𝗢𝗡 𖣔━━╮
│                       
│  ⚠️ 𝘼𝙡𝙧𝙚𝙖𝙙𝙮 𝙍𝙚𝙜𝙞𝙨𝙩𝙚𝙧𝙚𝙙
│  
│  💜 𝙔𝙤𝙪'𝙧𝙚 𝙖𝙡𝙧𝙚𝙖𝙙𝙮 𝙞𝙣 𝙩𝙝𝙚 𝙨𝙮𝙨𝙩𝙚𝙢!
│
╰━━━━━━━━━━━━━━━━━━━╯`
    }, { quoted: msg });
  }

  await userRef.set({
    registered: true,
    registeredAt: Date.now(),
    wallet: 1000,
    bank: 0,
    cards: [],
    level: 1,
    xp: 0,
    name: 'Traveler',
    age: 0,
    profileQuote: 'New to Nexora'
  }, { merge: true });

  const response = `╭━━𖣔 𝗥𝗘𝗚𝗜𝗦𝗧𝗥𝗔𝗧𝗜𝗢𝗡 𖣔━━╮
│                       
│  ✅ 𝙎𝙪𝙘𝙘𝙚𝙨𝙨𝙛𝙪𝙡𝙡𝙮 𝙍𝙚𝙜𝙞𝙨𝙩𝙚𝙧𝙚𝙙!
│  
│  💰 𝙎𝙩𝙖𝙧𝙩𝙞𝙣𝙜 𝘽𝙖𝙡𝙖𝙣𝙘𝙚: 1000 𝙘𝙤𝙞𝙣𝙨
│  🎴 𝘾𝙖𝙧𝙙𝙨: 0
│  ⭐ 𝙇𝙚𝙫𝙚𝙡: 1
│  
│  💜 𝙒𝙚𝙡𝙘𝙤𝙢𝙚 𝙩𝙤 𝙉𝙚𝙭𝙤𝙧𝙖!
│
╰━━━━━━━━━━━━━━━━━━━╯`;

  await sock.sendMessage(context.from, { text: response }, { quoted: msg });
};

const leaderboard = async (sock, msg, args, context) => {
  const usersSnapshot = await db.collection('users').orderBy('wallet', 'desc').limit(10).get();
  
  let leaderboardText = `╭━━𖣔 𝗟𝗘𝗔𝗗𝗘𝗥𝗕𝗢𝗔𝗥𝗗 𖣔━━╮
│                       
│  🏆 𝙏𝙤𝙥 10 𝙍𝙞𝙘𝙝𝙚𝙨𝙩 𝙐𝙨𝙚𝙧𝙨
│
╰━━━━━━━━━━━━━━━━━━━╯

`;

  let rank = 1;
  usersSnapshot.forEach(doc => {
    const data = doc.data();
    const medals = ['🥇', '🥈', '🥉'];
    const medal = rank <= 3 ? medals[rank - 1] : `${rank}.`;
    leaderboardText += `${medal} @${doc.id.split('@')[0]} - ${data.wallet || 0} 💰\n`;
    rank++;
  });

  leaderboardText += '\n━━━━━━━━━━━━━━━\n💜 𝗞𝗲𝗲𝗽 𝗴𝗿𝗶𝗻𝗱𝗶𝗻𝗴!';

  const mentions = usersSnapshot.docs.map(doc => doc.id);
  await sock.sendMessage(context.from, { text: leaderboardText, mentions }, { quoted: msg });
};

const market = async (sock, msg, args, context) => {
  const response = `╭━━𖣔 𝗠𝗔𝗥𝗞𝗘𝗧 𖣔━━╮
│                       
│  🏪 𝙉𝙚𝙭𝙤𝙧𝙖 𝙈𝙖𝙧𝙠𝙚𝙩
│  
│  🎴 𝘾𝙖𝙧𝙙 𝙋𝙖𝙘𝙠𝙨
│  ├ 𝘽𝙖𝙨𝙞𝙘 𝙋𝙖𝙘𝙠: 500 💰
│  ├ 𝙋𝙧𝙚𝙢𝙞𝙪𝙢 𝙋𝙖𝙘𝙠: 1500 💰
│  └ 𝙇𝙚𝙜𝙚𝙣𝙙𝙖𝙧𝙮 𝙋𝙖𝙘𝙠: 5000 💰
│  
│  💜 𝙐𝙨𝙚 .𝙗𝙪𝙮 <𝙞𝙩𝙚𝙢> 𝙩𝙤 𝙥𝙪𝙧𝙘𝙝𝙖𝙨𝙚
│
╰━━━━━━━━━━━━━━━━━━━╯`;

  await sock.sendMessage(context.from, { text: response }, { quoted: msg });
};

const mugen = async (sock, msg, args, context) => {
  const response = `╭━━𖣔 𝗠𝗨𝗚𝗘𝗡 𖣔━━╮
│                       
│  ♾️ 𝙈𝙪𝙜𝙚𝙣 𝙎𝙮𝙨𝙩𝙚𝙢
│  
│  🌀 𝙄𝙣𝙛𝙞𝙣𝙞𝙩𝙚 𝙋𝙤𝙨𝙨𝙞𝙗𝙞𝙡𝙞𝙩𝙞𝙚𝙨
│  🎴 𝘾𝙤𝙡𝙡𝙚𝙘𝙩 𝙐𝙣𝙞𝙦𝙪𝙚 𝘾𝙖𝙧𝙙𝙨
│  ⚔️ 𝘽𝙖𝙩𝙩𝙡𝙚 & 𝙏𝙧𝙖𝙙𝙚
│  
│  💜 𝙀𝙭𝙥𝙡𝙤𝙧𝙚 𝙩𝙝𝙚 𝙫𝙚𝙧𝙨𝙚!
│
╰━━━━━━━━━━━━━━━━━━━╯`;

  await sock.sendMessage(context.from, { text: response }, { quoted: msg });
};

module.exports = {
  menu,
  ping,
  alive,
  afk,
  register,
  leaderboard,
  market,
  mugen
};
