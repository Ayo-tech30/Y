# 🌟 NEXORA VIOLET BOT 🌟

Advanced WhatsApp Bot with Cards, Economy, Gambling & More!

## ✨ Features

- 🎴 **Card Collection System** - Collect, trade, and auction rare cards
- 💰 **Economy System** - Wallet, bank, daily rewards, work, rob
- 🎰 **15+ Gambling Games** - Slots, coinflip, dice, roulette, and more
- 🛡️ **Group Management** - Admin commands, welcome/goodbye, antilink
- 👤 **Profile System** - Customizable profiles with quotes and stats
- 🔍 **Search & AI** - GPT integration ready
- 🖼️ **Image Processing** - Stickers, blur effects
- 🌟 **Fun Commands** - Match, roast, simp meter
- 📥 **Download Commands** - Music, Instagram, TikTok (API ready)

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Go to Project Settings > Service Accounts
4. Generate a new private key (JSON file)
5. Open `firebase.js` and replace the placeholder values with your Firebase credentials:

```javascript
const serviceAccount = {
  "type": "service_account",
  "project_id": "YOUR_PROJECT_ID",  // ← Your project ID
  "private_key_id": "YOUR_PRIVATE_KEY_ID",
  "private_key": "YOUR_PRIVATE_KEY",  // ← Your private key
  "client_email": "YOUR_CLIENT_EMAIL",
  "client_id": "YOUR_CLIENT_ID",
  // ... rest of credentials
};
```

6. Also update the database URL:
```javascript
databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com"
```

### 3. Start the Bot

```bash
npm start
```

### 4. Pairing with WhatsApp

When you start the bot for the first time:

1. The terminal will ask: "📱 Enter your WhatsApp number"
2. Enter your number with country code (e.g., 1234567890)
3. A pairing code will be displayed
4. Open WhatsApp > Linked Devices > Link a Device
5. Enter the pairing code

## 📱 Bot Commands

### ⚙️ Main Menu
- `.menu` - Show all commands
- `.ping` - Check bot response time
- `.alive` - Check bot status
- `.register` - Register in the system
- `.leaderboard` - Top richest users
- `.mode <private/public>` - Change bot mode

### 👤 Profile
- `.profile [@user]` - View profile
- `.setprofile` - Set profile picture
- `.setprofilequote <quote>` - Set profile quote
- `.setage <num>` - Set age
- `.setname <name>` - Set name

### 🛡️ Group Admin
- `.promote @user` - Make admin
- `.demote @user` - Remove admin
- `.kick @user` - Remove from group
- `.warn @user` - Warn user
- `.tagall <message>` - Tag everyone
- `.welcome on/off` - Toggle welcome
- `.goodbye on/off` - Toggle goodbye
- `.antilink on/off` - Toggle antilink

### 🎴 Cards
- `.mycards` - View your cards
- `.rollcard` - Get a random card
- `.givecard @user <id>` - Gift card
- `.sellcard <id>` - Sell card
- `.cards on/off` - Toggle card spawning

### 💰 Economy
- `.accbal [@user]` - Check balance
- `.deposit <amount>` - Deposit to bank
- `.withdraw <amount>` - Withdraw from bank
- `.send @user <amount>` - Send money
- `.daily` - Daily reward
- `.work` - Work for money
- `.rob @user` - Rob someone

### 🎰 Gambling
- `.gamble <amount>` - 50/50 gamble
- `.slots <amount>` - Slot machine
- `.coinflip <amount> <heads/tails>` - Coin flip
- `.dice <amount>` - Roll dice
- And 10+ more games!

## 🔧 Configuration

### Bot Mode
- **Public Mode**: Bot responds everywhere
- **Private Mode**: Bot only responds in groups

Use `.mode private` or `.mode public` to switch

### Firebase Structure

The bot uses these Firestore collections:
- `users/` - User data (wallet, cards, profile)
- `groups/` - Group settings (welcome, antilink, etc.)

## 🎨 Features

### Card Spawn System
When enabled in a group, cards will spawn randomly. Upload an image with a message to spawn a custom card!

### Economy System
- Starting balance: 1000 coins
- Daily reward: 1000 coins (24h cooldown)
- Work: 200-700 coins (1h cooldown)
- Rob: Steal 30% or lose 500 coins

### Admin Auto-Detection
If your WhatsApp number is a group admin, the bot automatically gets admin permissions!

## 📝 Notes

- Bot ignores old messages when restarting (no spam on reconnect)
- Silent mode suppresses Replit connection warnings
- All responses have beautiful formatted layouts
- Firebase handles all data persistence

## 🎯 Bot Owner

**Owner**: Kynx  
**Bot Name**: Violet  
**Prefix**: `.`

## 💜 Powered by Nexora

Enjoy your advanced WhatsApp bot!
