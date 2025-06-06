require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const WELCOME_CHANNEL_ID = '1369679906346242121'; // welcome channel ID

client.once('ready', async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  const channel = await client.channels.fetch(WELCOME_CHANNEL_ID);
  if (!channel) return console.error('❌ Channel not found.');

  const embed = new EmbedBuilder()
    .setColor(0x8e44ad)
    .setAuthor({ name: 'PlugBot', iconURL: client.user.displayAvatarURL() })
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
    .setFooter({ text: 'NitroPlug • Premium Discord Services' });

  await channel.send({ embeds: [embed] });
  console.log('✅ Welcome message sent.');
});

client.login(process.env.TOKEN);
