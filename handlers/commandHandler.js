const { db } = require('../firebase');
const mainCommands = require('./commands/main');
const profileCommands = require('./commands/profile');
const adminCommands = require('./commands/admin');
const cardCommands = require('./commands/cards');
const economyCommands = require('./commands/economy');
const gamblingCommands = require('./commands/gambling');
const searchCommands = require('./commands/search');
const imageCommands = require('./commands/image');
const funCommands = require('./commands/fun');
const downloadCommands = require('./commands/download');

async function handleCommand(sock, msg, command, args, context) {
  const { from, sender, isGroup, isAdmin, isBotAdmin } = context;

  // Route commands to appropriate handlers
  const commandMap = {
    // Main
    'menu': mainCommands.menu,
    'ping': mainCommands.ping,
    'alive': mainCommands.alive,
    'afk': mainCommands.afk,
    'register': mainCommands.register,
    'reg': mainCommands.register,
    'leaderboard': mainCommands.leaderboard,
    'lb': mainCommands.leaderboard,
    'market': mainCommands.market,
    'mugen': mainCommands.mugen,

    // Profile
    'p': profileCommands.profile,
    'profile': profileCommands.profile,
    'setprofile': profileCommands.setProfile,
    'setp': profileCommands.setProfile,
    'setprofilequote': profileCommands.setProfileQuote,
    'setage': profileCommands.setAge,
    'setname': profileCommands.setName,

    // Admin
    'promote': adminCommands.promote,
    'demote': adminCommands.demote,
    'mute': adminCommands.mute,
    'unmute': adminCommands.unmute,
    'warn': adminCommands.warn,
    'warncount': adminCommands.warnCount,
    'resetwarn': adminCommands.resetWarn,
    'kick': adminCommands.kick,
    'delete': adminCommands.deleteMsg,
    'tagall': adminCommands.tagAll,
    'hidetag': adminCommands.hideTag,
    'welcome': adminCommands.welcome,
    'goodbye': adminCommands.goodbye,
    'antilink': adminCommands.antilink,
    'groupinfo': adminCommands.groupInfo,

    // Cards
    'mycards': cardCommands.myCards,
    'get': cardCommands.getCard,
    'deck': cardCommands.deck,
    'givecard': cardCommands.giveCard,
    'sellcard': cardCommands.sellCard,
    'auction': cardCommands.auction,
    'bid': cardCommands.bid,
    'rollcard': cardCommands.rollCard,
    'cards': cardCommands.toggleCards,

    // Economy
    'accbal': economyCommands.balance,
    'deposit': economyCommands.deposit,
    'withdraw': economyCommands.withdraw,
    'send': economyCommands.send,
    'daily': economyCommands.daily,
    'weekly': economyCommands.weekly,
    'monthly': economyCommands.monthly,
    'inv': economyCommands.inventory,
    'work': economyCommands.work,
    'rob': economyCommands.rob,

    // Gambling
    'gamble': gamblingCommands.gamble,
    'slots': gamblingCommands.slots,
    'roulette': gamblingCommands.roulette,
    'blackjack': gamblingCommands.blackjack,
    'coinflip': gamblingCommands.coinflip,
    'dice': gamblingCommands.dice,
    'lottery': gamblingCommands.lottery,
    'jackpot': gamblingCommands.jackpot,
    'crash': gamblingCommands.crash,
    'race': gamblingCommands.race,
    'wheel': gamblingCommands.wheel,
    'poker': gamblingCommands.poker,
    'mines': gamblingCommands.mines,
    'plinko': gamblingCommands.plinko,
    'limbo': gamblingCommands.limbo,

    // Search
    'gpt': searchCommands.gpt,
    'ai': searchCommands.ai,
    'google': searchCommands.google,

    // Image
    'sticker': imageCommands.sticker,
    'blur': imageCommands.blur,
    'removebg': imageCommands.removebg,

    // Fun
    'match': funCommands.match,
    'roast': funCommands.roast,
    'simp': funCommands.simp,

    // Download
    'play': downloadCommands.play,
    'instagram': downloadCommands.instagram,
    'tiktok': downloadCommands.tiktok,
  };

  const handler = commandMap[command];
  
  if (handler) {
    await handler(sock, msg, args, context);
  }
}

module.exports = { handleCommand };
