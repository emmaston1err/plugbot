require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const fs = require('fs');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const WELCOME_CHANNEL_ID = '1369679906346242121'; // Βάλε εδώ το ID του welcome channel
const STATE_FILE = 'sent.json'; // Θα θυμάται αν έχει σταλεί ήδη

client.once('ready', async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  let state = {};
  if (fs.existsSync(STATE_FILE)) {
    state = JSON.parse(fs.readFileSync(STATE_FILE));
  }

  if (state.welcomeSent) {
    console.log('ℹ️ Welcome message already sent.');
    return;
  }

  const channel = await client.channels.fetch(WELCOME_CHANNEL_ID);
  if (!channel) return console.error('❌ Channel not found.');

  const embed = new EmbedBuilder()
    .setColor(0x8e44ad)
    .setAuthor({ name: 'PlugBot', iconURL: client.user.displayAvatarURL() })
    .setTitle('Welcome to NitroPlug!')
    .setDescription("💜 Your hub for safe, affordable, and instant Discord Nitro & Boosts.\n━━━━━━━━━━━━━━━━━━━━\n\n📌 **What We Offer**\n・Classic & Boosted Discord Nitro\n・Stable Server Boost Packages\n・Delivered In Minutes Via Verified Methods\n・TRC-20 Crypto Payments Only (USDT)\n\n━━━━━━━━━━━━━━━━━━━━\n\n🛠️ **How to Get Started**\n1. Head to <#CHANNEL_ID_BUY_NITRO> and **browse our offers.**\n2. Select your plan using the menu.\n3. Click **Start Order** and follow the prompts.\n4. A private ticket channel will be created for your order.\n\n━━━━━━━━━━━━━━━━━━━━\n\n⛔ **Important Rules**\nWe never DM first. All orders are handled inside this server.\nPayments are made **only** through TRC-20 (USDT).\n2FA on your account is **highly recommended.**\n\n━━━━━━━━━━━━━━━━━━━━\n\n🛡️ Your security is our priority.\n✅ Your satisfaction is guaranteed — or your money back.")
    .setFooter({ text: 'NitroPlug • Premium Discord Services' });

  await channel.send({ embeds: [embed] });

  // Save state
  state.welcomeSent = true;
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
  console.log('✅ Welcome message sent.');
});

client.login(process.env.TOKEN);
