const axios = require('axios');

const play = async (sock, msg, args, context) => {
  const query = args.join(' ');
  if (!query) {
    return sock.sendMessage(context.from, { text: '❌ Please provide a song name!' }, { quoted: msg });
  }

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗣𝗟𝗔𝗬 𝗠𝗨𝗦𝗜𝗖 𖣔━━╮
│                       
│  🎵 𝙎𝙚𝙖𝙧𝙘𝙝𝙞𝙣𝙜...
│  
│  📝 "${query}"
│  
│  💜 Connect YouTube API
│  to enable downloads
│
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

const instagram = async (sock, msg, args, context) => {
  const url = args[0];
  if (!url || !url.includes('instagram.com')) {
    return sock.sendMessage(context.from, { text: '❌ Please provide a valid Instagram URL!' }, { quoted: msg });
  }

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗜𝗡𝗦𝗧𝗔𝗚𝗥𝗔𝗠 𖣔━━╮
│                       
│  📸 𝘿𝙤𝙬𝙣𝙡𝙤𝙖𝙙𝙞𝙣𝙜...
│  
│  🔗 ${url}
│  
│  💜 Connect Instagram API
│  to enable downloads
│
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

const tiktok = async (sock, msg, args, context) => {
  const url = args[0];
  if (!url || !url.includes('tiktok.com')) {
    return sock.sendMessage(context.from, { text: '❌ Please provide a valid TikTok URL!' }, { quoted: msg });
  }

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗧𝗜𝗞𝗧𝗢𝗞 𖣔━━╮
│                       
│  📱 𝘿𝙤𝙬𝙣𝙡𝙤𝙖𝙙𝙞𝙣𝙜...
│  
│  🔗 ${url}
│  
│  💜 Connect TikTok API
│  to enable downloads
│
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

module.exports = {
  play,
  instagram,
  tiktok
};
