const {
  Client,
  GatewayIntentBits,
  Collection,
  REST,
  Routes,
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
} = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Φορτώνουμε τα commands (αν έχεις άλλα)
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once('ready', async () => {
  console.log(`✅ Συνδέθηκε ως ${client.user.tag}`);

  // Register το slash command
  const commands = [
    new SlashCommandBuilder()
      .setName('postmenu')
      .setDescription('Στέλνει το Nitro/Boosts embed menu'),
  ].map(cmd => cmd.toJSON());

  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

  try {
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands },
    );
    console.log('✅ Slash commands registered!');
  } catch (error) {
    console.error(error);
  }

  // Αυτόματο post στο κανάλι (βάλε το σωστό ID!)
  const channel = client.channels.cache.get('1373321120660324413');
  if (channel && channel.type === ChannelType.GuildText) {
    const embed = new EmbedBuilder()
      .setColor(0xD391FA)
      .setTitle('**<a:plug_buy:1374809315525001301> Buy**')
      .setDescription(`
Browse Our Selection
<a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932>
<a:plug_dash:1374778714684002404> <:plug_arrow:1374782493491728394> **Only authentic and guaranteed services – no compromises!** <:plug_verify:1374785019066712267>
<a:plug_dash:1374778714684002404> <:plug_arrow:1374782493491728394> **Shop smart – our products are secure, reliable, and proven.** <:plug_team:1374785016445276200>

What Makes Us Different
<a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932>
<:plug_arrow:1374782493491728394> • Zero Risk – 100% Safe & Verified Offers  
<:plug_arrow:1374782493491728394> • Instant Delivery – No Waiting Around  
<:plug_arrow:1374782493491728394> • Budget-Friendly – Premium Service At Low Prices  
<:plug_arrow:1374782493491728394> • Round-The-Clock Help – Support When You Need It, Always  

**:warning: Important Notice**
<a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932>
<a:plug_impression:1374779187918803004> All payments must be made via TRC-20 cryptocurrency only. Orders are processed exclusively through ticket requests on this server. Do not trust direct messages or unofficial contacts.
`)
      .setFooter({
        text: 'NitroPlug • Premium Discord Services',
        iconURL: 'https://i.imgur.com/TRZTCKT.png',
      });

    const menu = new StringSelectMenuBuilder()
      .setCustomId('product_menu')
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
      ]);

    const row = new ActionRowBuilder().addComponents(menu);

    await channel.send({ embeds: [embed], components: [row] });
  }
});

const planNames = {
  boost_1m: 'NITRO BOOST 1M',
  boost_3m: 'NITRO BOOST 3M',
  basic_1m: 'NITRO BASIC 1M',
  basic_12m: 'NITRO BASIC 12M'
};

client.on('interactionCreate', async interaction => {
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (command) {
      try {
        await command.execute(client, interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: '❌ Κάτι πήγε στραβά.',
          flags: 64, // == ephemeral
        });
      }
    }
  }

  if (interaction.isStringSelectMenu()) {
    if (!interaction.deferred && !interaction.replied) {
      try {
        await interaction.deferReply({ flags: 64 });
      } catch (err) {
        console.error('❌ Failed to defer interaction reply:', err);
        return;
      }
    }

    const selected = interaction.values[0];

    if (selected === 'nitro') {
      const embed1 = new EmbedBuilder()
        .setColor(0xD391FA)
        .setTitle('**Discord Nitro Deals**')
        .setDescription(`
Fast • Legit • Safe  
<a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932>
<a:plug_nitro:1374801855389106216> Nitro Boost [Login Method]  
> <:plug_boost:1374812787976700016> Nitro Boost 1 Month <:plug_arrow:1374782493491728394> **$6**  
> <:plug_booster:1374812926132752414> Nitro Boost 3 Months <:plug_arrow:1374782493491728394> **$9**

<a:plug_nitro_basic:1374814151737868349> Nitro Basic [Login Method]  
> <:plug_basic_wumpus:1374814681465884712> Nitro Basic 1 Month <:plug_arrow:1374782493491728394> **$2**  
> <:plug_nitro_wumpus:1374815093551927347> Nitro Basic 12 Months <:plug_arrow:1374782493491728394> **$20**
<a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932>
Accepted Payments: <a:plug_trade:1374822992709943387> **TRC-20 Crypto Only** | **USDT**
<:plug_arrow:1374782493491728394> What You Get:
- <:plug_check:1374824992340054057> 100% Legit – Paid Through Discord  
- <:plug_rocket:1374824938426597488> Activation In Just A Few Minutes  
- <:plug_lock:1374824968160022538> We Only Log In To Activate  
- <:plug_shield_check:1374824939999465502> 2FA Recommended For Extra Security  
- <:plug_refresh:1374824936669057034> Full Refund Or Replacement Guarantee
        `)
      
        .setFooter({
          text: 'NitroPlug • Premium Discord Services',
          iconURL: 'https://i.imgur.com/TRZTCKT.png',
        });

      const button = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
  .setCustomId('start_order')
  .setLabel('Start Order')
  .setStyle(ButtonStyle.Secondary)
      );

      await interaction.editReply({
        embeds: [embed1],
        components: [button],
      });
    }

   if (selected === 'boosts') {
  const embed = new EmbedBuilder()
    .setColor(0xD391FA)
    .setTitle('📶 Server Boosts')
    .setDescription(`
Fast & Quality Boosts

<:plug_boost:1374812787976700016> 14 Boosts 1 Month  
- **$9.99** <a:plug_crypto:1375416985246480515>  
- **$14.99** 🌐  

<:plug_booster:1374812926132752414> 14 Boosts 3 Month  
- **$25.2** <a:plug_crypto:1375416985246480515>  
- **$34.99** 🌐
    `);

  const button = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('start_order_boosts')
      .setLabel('Start Order')
      .setStyle(ButtonStyle.Secondary)
  );

  await interaction.editReply({
    embeds: [embed],
    components: [button],
  });
}

  }
    
    if (interaction.isButton()) {
  if (interaction.customId === 'start_order') {
    // 1. Στείλε πρώτο μήνυμα
    await interaction.reply({
      content: 'Starting your order...',
      flags: 64 // == ephemeral
    });

    // 2. Περίμενε λίγα ms και στείλε δεύτερο embed + dropdown
    const embed = new EmbedBuilder()
      .setColor(0xD391FA)
      .setTitle('<a:plug_waiting:1375428227392208948> Nitro')
      .setDescription('Please select a plan:');

    const menu = new StringSelectMenuBuilder()
      .setCustomId('nitro_plan')
      .setPlaceholder('Click')
      .addOptions([
        {
          label: 'Nitro Boost',
          description: 'Via Login',
          value: 'boost',
          emoji: '<a:plug_nitro:1374801855389106216>',
        },
        {
          label: 'Nitro Basic',
          description: 'Via Login',
          value: 'basic',
          emoji: '<a:plug_nitro_basic:1374814151737868349>',
        },
      ]);

    const row = new ActionRowBuilder().addComponents(menu);

    // στέλνει δεύτερο μήνυμα στην ίδια interaction thread
    await interaction.followUp({
      embeds: [embed],
      components: [row],
      flags: 64, // == ephemeral
    });
  }
}

    if (interaction.isStringSelectMenu()) {
  const selected = interaction.values[0];

  // Επιλογή ανάμεσα σε Boost/Basic
  if (interaction.customId === 'nitro_plan') {
    if (selected === 'boost') {
      const embed = new EmbedBuilder()
        .setColor(0xD391FA)
        .setTitle('<a:plug_waiting:1375428227392208948> Boost Packages')
        .setDescription('Please select a package:');

      const menu = new StringSelectMenuBuilder()
        .setCustomId('boost_package')
        .setPlaceholder('Click')
        .addOptions([
          {
            label: '1 Month - $6',
            value: 'boost_1m',
              emoji: {
                  id: '1374812787976700016', // plug_boost
                  name: 'plug_boost',
              }
          },
          {
            label: '3 Months - $9',
            value: 'boost_3m',
              emoji: {
                  id: '1374812926132752414', // plug_booster
                  name: 'plug_booster',
              }
          },
        ]);

      const row = new ActionRowBuilder().addComponents(menu);
      return interaction.followUp({ embeds: [embed], components: [row], flags: 64 });
    }

    if (selected === 'basic') {
      const embed = new EmbedBuilder()
        .setColor(0xD391FA)
        .setTitle('<a:plug_waiting:1375428227392208948> Boost Packages')
        .setDescription('Please select a package:');

      const menu = new StringSelectMenuBuilder()
        .setCustomId('basic_package')
        .setPlaceholder('Click')
        .addOptions([
          {
            label: '1 Month - $2',
            value: 'basic_1m',
              emoji: {
                  id: '1374814681465884712', // plug_boost
                  name: 'plug_basic_wumpus',
              }
          },
          {
            label: '12 Months - $20',
            value: 'basic_12m',
              emoji: {
                  id: '1374815093551927347', // plug_boost
                  name: 'plug_nitro_wumpus',
              }
          },
        ]);

      const row = new ActionRowBuilder().addComponents(menu);
      return interaction.followUp({ embeds: [embed], components: [row], flags: 64 });
    }
  }

  // Επιλογή τελικού πακέτου και εμφάνιση κουμπιού "Open Ticket"
  if (interaction.customId === 'boost_package' || interaction.customId === 'basic_package') {
    const selectedPackage = interaction.values[0];
      const displayName = planNames[selectedPackage] || selectedPackage;
    const embed = new EmbedBuilder()
      .setColor(0xD391FA)
      .setTitle('Order')
      .setDescription(`Selected plan: **${displayName}**`);

    const button = new ButtonBuilder()
      .setCustomId(`create_ticket_${selectedPackage}`)
      .setLabel('Open Ticket')
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder().addComponents(button);
    return interaction.followUp({ embeds: [embed], components: [row], flags: 64 });
  }
}

    if (interaction.isButton()) {
  const id = interaction.customId;
  if (id.startsWith('create_ticket_')) {
    const plan = id.replace('create_ticket_', '');
      const displayName = planNames[plan] || plan;
      const slug = displayName.toLowerCase().replace(/\s+/g, '-'); // e.g. nitro-boost-1m

    // Δημιουργία ticket καναλιού
    const guild = interaction.guild;
    const channel = await guild.channels.create({
      name: `ticket-${slug}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: guild.id,
          deny: ['ViewChannel'],
        },
        {
          id: interaction.user.id,
          allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory'],
        },
        {
          id: '1373293304057303183', // Βάλε το ID του staff role
          allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory'],
        },
        {
            id: client.user.id, // Το bot
            allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory', 'EmbedLinks'],
        },
      ],
    });

    await interaction.reply({
      content: `<:plug_ticket:1374774141873295381> Ticket Opened: ${channel}`,
      flags: 64, // == ephemeral
    });

    await channel.send({
  embeds: [
    new EmbedBuilder()
      .setColor(0xD391FA)
      .setTitle('<:plug_ticket:1374774141873295381> Ticket Created')
      .setDescription(`Selected Plan: **${displayName}**\n\nA member of our staff will assist you shortly. Please wait and do not ping.`)
      .setFooter({ text: 'NitroPlug Ticket System', iconURL: client.user.displayAvatarURL() })
      .setTimestamp()
  ],
        components: [
    new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('close_ticket')
        .setLabel('Close')
        .setStyle(ButtonStyle.Danger)
    )
  ]
});

  }
        
        
        if (interaction.customId === 'close_ticket') {
  const isStaff = interaction.member.roles.cache.has('1373293304057303183');
  const isOwner = interaction.channel.permissionsFor(interaction.user.id)?.has('ManageChannels') ||
                  interaction.channel.name.includes(interaction.user.username.toLowerCase());

  if (isStaff || isOwner) {
    await interaction.reply({ content: '🔒 Closing ticket in 3 seconds...', ephemeral: true });
    setTimeout(() => {
      interaction.channel.delete().catch(console.error);
    }, 3000);
  } else {
    await interaction.reply({ content: '❌ You don’t have permission to close this ticket.', ephemeral: true });
  }
}

if (interaction.customId === 'approve_ticket') {
  const isStaff = interaction.member.roles.cache.has('1373293304057303183');
  if (!isStaff) return interaction.reply({ content: '❌ Only staff can approve tickets.', ephemeral: true });

  await interaction.reply({ content: '✅ Ticket approved by staff!' });
  // Μπορείς να κάνεις notify ή αλλάξεις ρόλους εδώ
}

if (interaction.customId === 'decline_ticket') {
  const isStaff = interaction.member.roles.cache.has('1373293304057303183');
  if (!isStaff) return interaction.reply({ content: '❌ Only staff can decline tickets.', ephemeral: true });

  await interaction.reply({ content: '❌ Ticket declined by staff.' });
  setTimeout(() => {
    interaction.channel.delete().catch(console.error);
  }, 3000);
}

}


});

client.login(process.env.TOKEN);
