const axios = require('axios');

const gpt = async (sock, msg, args, context) => {
  const query = args.join(' ');
  if (!query) {
    return sock.sendMessage(context.from, { text: '❌ Please provide a query!' }, { quoted: msg });
  }

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗚𝗣𝗧 𖣔━━╮
│                       
│  🤖 𝘼𝙄 𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙚
│  
│  📝 Query: ${query}
│  
│  💜 AI response would appear here
│  (Connect your preferred AI API)
│
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

const ai = async (sock, msg, args, context) => {
  await gpt(sock, msg, args, context);
};

const google = async (sock, msg, args, context) => {
  const query = args.join(' ');
  if (!query) {
    return sock.sendMessage(context.from, { text: '❌ Please provide a search query!' }, { quoted: msg });
  }

  await sock.sendMessage(context.from, {
    text: `╭━━𖣔 𝗚𝗢𝗢𝗚𝗟𝗘 𝗦𝗘𝗔𝗥𝗖𝗛 𖣔━━╮
│                       
│  🔍 𝙎𝙚𝙖𝙧𝙘𝙝𝙞𝙣𝙜...
│  
│  📝 "${query}"
│  
│  💜 https://google.com/search?q=${encodeURIComponent(query)}
│
╰━━━━━━━━━━━━━━━━━━━╯`
  }, { quoted: msg });
};

module.exports = {
  gpt,
  ai,
  google
};
