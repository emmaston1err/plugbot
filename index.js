const express = require('express');
const app = express();
const PORT = 3000;
app.get('/', (req, res) => res.send('bot is alive!'));
app.listen(PORT, () => console.log(`🌐 web server listening on port ${PORT}`));

require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const WELCOME_CHANNEL_ID = '1369679906346242121'; // welcome channel ID
const BUY_CHANNEL_ID = '1373321120660324413'; // buy channel ID

client.once('ready', async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  const channel = await client.channels.fetch(WELCOME_CHANNEL_ID);
  if (!channel) return console.error('❌ Channel not found.');

  const embed = new EmbedBuilder()
    .setColor(0x8e44ad)
    .setTitle('Welcome to NitroPlug!')
    .setDescription(`💜 Your hub for safe, affordable, and instant Discord Nitro & Boosts.
<a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932>
<a:plug_ask:1374778982402232471> What We Offer
> <:plug_arrow:1374782493491728394> Classic & Boosted Discord Nitro  
> <:plug_arrow:1374782493491728394> Stable Server Boost Packages  
> <:plug_arrow:1374782493491728394> Delivered In Minutes Via Verified Methods  
> <:plug_arrow:1374782493491728394> TRC-20 Crypto Payments Only (USDT)
<a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932>
<a:plug_impression:1374779187918803004> How to Get Started
> <:plug_arrow:1374782493491728394> 1. Head to <#1373321120660324413> and **browse our offers**.  
> <:plug_arrow:1374782493491728394> 2. Select your plan using the menu.  
> <:plug_arrow:1374782493491728394> 3. Click **Start Order** and follow the prompts.  
> <:plug_arrow:1374782493491728394> 4. A private ticket channel will be created for your order.
<a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932>
⛔ **Important Rules**  
<:plug_arrow:1374782493491728394> We never DM first. All orders are handled inside this server.  
<:plug_arrow:1374782493491728394> Payments are made **only** through TRC-20 (USDT).  
<:plug_arrow:1374782493491728394> 2FA on your account is **highly recommended**.
<a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932>
<a:plug_dash:1374778714684002404> Your security is our priority.  
<a:plug_dash:1374778714684002404> Your satisfaction is guaranteed — or your money back.`)
    .setFooter({ iconURL: client.user.displayAvatarURL(), text: 'NitroPlug • Premium Discord Services' });
  
  // buy embed for the buy-nitro channel
  const buyEmbed = new EmbedBuilder()
    .setColor(0x8e44ad)
    .setTitle('<a:plug_buy:1374809315525001301> Buy')
    .setDescription(`Browse Our Selection
    <a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932>
    <a:plug_dash:1374778714684002404> <:plug_arrow:1374782493491728394> **Only authentic and guaranteed services – no compromises!** <:plug_verify:1374785019066712267>
    <a:plug_dash:1374778714684002404> <:plug_arrow:1374782493491728394> **Shop smart – our products are secure, reliable, and proven.** <:plug_team:1374785016445276200>
    
    What Makes Us Different
    <a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932>
     <:plug_arrow:1374782493491728394> • Zero Risk – 100% Safe & Verified Offers
     <:plug_arrow:1374782493491728394> • Instant Delivery – No Waiting Around
     <:plug_arrow:1374782493491728394> • Budget-Friendly – Premium Service At Low Prices
     <:plug_arrow:1374782493491728394> • Round-The-Clock Help – Support When You Need It, Always
    
    ⚠️ **Important Notice**
    <a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932>
    <a:plug_impression:1374779187918803004> All payments must be made via TRC-20 cryptocurrency only. Orders are processed exclusively through ticket requests on this server. Do not trust direct messages or unofficial contacts. <a:plug_impression:1374779187918803004>
  `)
    .setFooter({ iconURL: client.user.displayAvatarURL(), text: 'NitroPlug • Premium Discord Services' });

  // dropdown menu
  const productMenu = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId('select_product')
      .setPlaceholder('Select Product')
      .addOptions([
        {
          label: 'Nitro',
          description: 'Classic & Boosted Nitro Options',
          value: 'nitro',
          emoji: '<a:plug_nitro:1374801855389106216>',
        },
        {
          label: 'Boosts',
          description: 'Stable & Premium Boost Packages',
          value: 'boosts',
          emoji: '<a:plug_boosts:1374801892152053912>',
        },
      ])
  );

  // send the embed + dropdown to buy-nitro channel
  const buyChannel = await client.channels.fetch(BUY_CHANNEL_ID);
  if (buyChannel) {
    await buyChannel.send({ embeds: [buyEmbed], components: [productMenu] });
    console.log('✅ sent buy message with dropdown.');
  } else {
    console.error('❌ buy channel not found.');
  }
  
  await channel.send({ embeds: [embed] });
  console.log('✅ welcome message sent.');
});

client.login(process.env.TOKEN);

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isStringSelectMenu()) return;

  if (interaction.customId === 'select_product') {
    const selected = interaction.values[0];

    if (selected === 'nitro') {
      const nitroEmbed = new EmbedBuilder()
        .setColor(0x8e44ad)
        .setTitle('Discord Nitro')
        .setDescription(`Safe, Fast & Verified
        <a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932>
        <a:plug_nitro:1374801855389106216> Nitro Boosts
        > <:plug_boost:1374812787976700016> Nitro Boost - 1 Month <:plug_arrow:1374782493491728394> **$3**
        > <:plug_booster:1374812926132752414> Nitro Boost - 12 Months <:plug_arrow:1374782493491728394> **$9**
        <a:plug_nitro_basic:1374814151737868349> Nitro Basic
        > <:plug_basic_wumpus:1374814681465884712> Nitro Basic - 1 Month <:plug_arrow:1374782493491728394> **$2**
        > <:plug_nitro_wumpus:1374815093551927347> Nitro Basic - 12 Months <:plug_arrow:1374782493491728394> **$20**
        <a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932>
        <a:plug_trade:1374822992709943387> Accepted Payments: **USDT (TRC-20)** - only.
        <a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932>
        <:plug_features:1385229242781925517> Why Choose NitroPlug?
        > <:plug_check:1374824992340054057> 100% Legitimate & Paid.
        > <:plug_rocket:1374824938426597488> Delivery within minutes after order confirmation.
        > <:plug_lock:1374824968160022538> One-time login for payment only. We never keep or save any credentials.
        > <:plug_shield_check:1374824939999465502> Strongly recommend enabling 2FA for your safety.
        > <:plug_refresh:1374824936669057034> Full coverage & instant replacement if issues arise.
        `)
        .setColor(0x5865F2);

      await interaction.reply({ embeds: [nitroEmbed], ephemeral: true });
    }
  }
});

