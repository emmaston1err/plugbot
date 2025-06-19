const express = require('express');
const app = express();
const PORT = 3000;
app.get('/', (req, res) => res.send('bot is alive!'));
app.listen(PORT, () => console.log(`🌐 web server listening on port ${PORT}`));

require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const userSelections = new Map();

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
    .setColor(0xe5a0fa)
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
    .setColor(0xe5a0fa)
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
        .setColor(0xe5a0fa)
        .setTitle('Nitro')
        .setDescription(`Safe, Fast & Verified.
        <a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932>
        <a:plug_nitro:1374801855389106216> Nitro
        > <:plug_boost:1374812787976700016> Nitro Boost - 1 Month <:plug_arrow:1374782493491728394> **$3**
        > <:plug_booster:1374812926132752414> Nitro Boost - 12 Months <:plug_arrow:1374782493491728394> **$9**
        <a:plug_nitro_basic:1374814151737868349> Nitro
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
        .setColor(0xe5a0fa);

      const startOrderButton = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
    .setCustomId('start_order')
    .setLabel('Start Order')
    .setStyle(ButtonStyle.Secondary)
);

      await interaction.reply({
  embeds: [nitroEmbed],
  components: [startOrderButton],
  ephemeral: true
});

    }
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'start_order') {
    await interaction.reply({
      content: '<a:plug_buy:1374809315525001301> Starting your order...',
      ephemeral: true,
    });
    
    const orderEmbed = new EmbedBuilder()
      .setTitle('<a:plug_waiting:1375428227392208948> Nitro')
      .setDescription('Please choose a plan:')
      .setColor(0xe5a0fa);

    const planMenu = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('select_nitro_plan')
        .setPlaceholder('Click')
        .addOptions([
  {
    label: 'Nitro',
    description: 'Boosted Nitro Options',
    value: 'plan_nitro_boost',
    emoji: {
      name: 'plug_nitro',
      id: '1374801855389106216',
      animated: true
    },
  },
  {
    label: 'Nitro',
    description: 'Basic Nitro Options',
    value: 'plan_nitro_basic',
    emoji: {
      name: 'plug_nitro_basic',
      id: '1374814151737868349',
      animated: true
    },
  },
])
    );

    await interaction.followUp({
      embeds: [orderEmbed],
      components: [planMenu],
      ephemeral: true,
    });
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isStringSelectMenu()) return;
  if (interaction.customId !== 'select_nitro_plan') return;

  const selected = interaction.values[0];

  if (selected === 'plan_nitro_boost') {
    userSelections.set(interaction.user.id, selected);
    const boostEmbed = new EmbedBuilder()
      .setTitle('<a:plug_nitro:1374801855389106216> Nitro')
      .setDescription(`Please select a plan:
      > <:plug_boost:1374812787976700016> Nitro Boost - 1 Month <:plug_arrow:1374782493491728394> **$3**
      > <:plug_booster:1374812926132752414> Nitro Boost - 12 Months <:plug_arrow:1374782493491728394> **$9**
`)
      .setColor(0xe5a0fa);

    const boostMenu = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('select_nitro_boost_plan')
        .setPlaceholder('Click')
        .addOptions([
          {
            label: '1M - $3',
            value: 'boost_1m',
            emoji: { name: 'plug_boost', id: '1374812787976700016' }
          },
          {
            label: '12M - $9',
            value: 'boost_12m',
            emoji: { name: 'plug_booster', id: '1374812926132752414' }
          },
        ])
    );

    await interaction.reply({ embeds: [boostEmbed], components: [boostMenu], ephemeral: true });
  }

  if (selected === 'plan_nitro_basic') {
    userSelections.set(interaction.user.id, selected);
    const basicEmbed = new EmbedBuilder()
      .setTitle('<a:plug_nitro_basic:1374814151737868349> Nitro Basic')
      .setDescription(`Please select a plan:
      > <:plug_basic_wumpus:1374814681465884712> Nitro Basic - 1 Month <:plug_arrow:1374782493491728394> **$2**
      > <:plug_nitro_wumpus:1374815093551927347> Nitro Basic - 12 Months <:plug_arrow:1374782493491728394> **$20**
`)
      .setColor(0xe5a0fa);

    const basicMenu = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('select_nitro_basic_plan')
        .setPlaceholder('Click')
        .addOptions([
          {
            label: '1M - $2',
            value: 'basic_1m',
            emoji: { name: 'plug_basic_wumpus', id: '1374814681465884712' }
          },
          {
            label: '12M - $20',
            value: 'basic_12m',
            emoji: { name: 'plug_nitro_wumpus', id: '1374815093551927347' }
          },
        ])
    );

    

    await interaction.reply({ embeds: [basicEmbed], components: [basicMenu], ephemeral: true });
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isStringSelectMenu()) return;

  const summaries = {
  boost_1m: {
    emoji: '<:plug_boost:1374812787976700016>',
    product: 'Nitro Boost',
    plan: '1 Month',
    price: '$3'
  },
  boost_12m: {
    emoji: '<:plug_booster:1374812926132752414>',
    product: 'Nitro Boost',
    plan: '12 Months',
    price: '$9'
  },
  basic_1m: {
    emoji: '<:plug_basic_wumpus:1374814681465884712>',
    product: 'Nitro Basic',
    plan: '1 Month',
    price: '$2'
  },
  basic_12m: {
    emoji: '<:plug_nitro_wumpus:1374815093551927347>',
    product: 'Nitro Basic',
    plan: '12 Months',
    price: '$20'
  }
};


  const selected = interaction.values[0];
  const summary = summaries[selected];
  if (!summary) return;

  userSelections.set(interaction.user.id, selected);

  const summaryEmbed = new EmbedBuilder()
    .setTitle('<a:plug_loading:1385244121878237317> Order Details:')
    .setColor(0xe5a0fa)
    .setDescription(`
    ⤹ ${summary.emoji} Product: **${summary.product}**
    ⤹ ${summary.emoji} Plan: **${summary.plan}**
    ⤹ ${summary.emoji} Price: **${summary.price}**
    ⤹ ${summary.emoji} Payment: **USDT (TRC-20)**
    
    ⚠️ Order will be completed via ticket. <a:plug_impression:1374779187918803004>
    `);

  const confirmButton = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('confirm_order')
      .setLabel('Confirm Order')
      .setStyle(ButtonStyle.Secondary)
  );

  await interaction.reply({ embeds: [summaryEmbed], components: [confirmButton], ephemeral: true });
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId !== 'confirm_order') return;

  // Πάρε την επιλογή του χρήστη
const selectedPlan = userSelections.get(interaction.user.id) || 'custom';

// Μετατροπή σε "καθαρό" ticket name
const ticketNames = {
  boost_1m: 'nitro-boost-1m',
  boost_12m: 'nitro-boost-12m',
  basic_1m: 'nitro-basic-1m',
  basic_12m: 'nitro-basic-12m'
};

const ticketLabel = ticketNames[selectedPlan] || 'custom';

  const guild = interaction.guild;
  const member = interaction.member;

  const ticketChannel = await guild.channels.create({
    name: `ticket-${ticketLabel}`,
    type: 0,
    permissionOverwrites: [
      {
        id: guild.roles.everyone,
        deny: ['ViewChannel'],
      },
      {
        id: member.user.id,
        allow: ['ViewChannel', 'SendMessages'],
      },
      {
        id: client.user.id,
        allow: ['ViewChannel', 'SendMessages'],
      }
    ],
  });

  await interaction.reply({
    content: `<:plug_ticket:1374774141873295381> Ticket created: <#${ticketChannel.id}>`,
    ephemeral: true
  });

  const closeButtonRow = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
    .setCustomId('close_ticket')
    .setLabel('Close Ticket')
    .setStyle(ButtonStyle.Danger)
);

const ticketEmbed = new EmbedBuilder()
  .setColor(0xe5a0fa)
  .setTitle(`<:plug_ticket:1374774141873295381> Hello ${member}, thank you for your order!`)
  .setDescription(`
 <:plug_arrow:1374782493491728394> Please wait for an agent to respond.
 <:plug_arrow:1374782493491728394> All transactions are handled **securely and privately** here.
 > ❌ Do not ping staff repeatedly.
 > Be respectful.
 > 🛑 Payments via TRC-20 only.

If you wish to cancel or close this ticket, you can use the button below.
  `)
  .setFooter({ text: 'NitroPlug Support', iconURL: client.user.displayAvatarURL() });

await ticketChannel.send({
  embeds: [ticketEmbed],
  components: [closeButtonRow]
});
  userSelections.delete(interaction.user.id);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId !== 'close_ticket') return;

  const channel = interaction.channel;

  await interaction.reply({
    content: '❌ Ticket will be closed in 2 seconds...',
    ephemeral: true,
  });

  setTimeout(() => {
    if (channel.deletable) {
      channel.delete().catch(console.error);
    }
  }, 2000);
});

