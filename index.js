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
<a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932>
<a:plug_dash:1374778714684002404> <:plug_arrow:1374782493491728394> **Only authentic and guaranteed services – no compromises!** <:plug_verify:1374785019066712267>
<a:plug_dash:1374778714684002404> <:plug_arrow:1374782493491728394> **Shop smart – our products are secure, reliable, and proven.** <:plug_team:1374785016445276200>

What Makes Us Different
<a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932>
<:plug_arrow:1374782493491728394> • Zero Risk – 100% Safe & Verified Offers  
<:plug_arrow:1374782493491728394> • Instant Delivery – No Waiting Around  
<:plug_arrow:1374782493491728394> • Budget-Friendly – Premium Service At Low Prices  
<:plug_arrow:1374782493491728394> • Round-The-Clock Help – Support When You Need It, Always  

**:warning: Important Notice**  
<a:plug_impression:1374779187918803004> All payments must be made via TRC-20 cryptocurrency only. Orders are processed exclusively through ticket requests on this server. Do not trust direct messages or unofficial contacts.
`)
      .setFooter({
        text: 'NitroPlug • Premium Discord Services',
        iconURL: 'https://i.imgur.com/TRZTCKT.png',
      });

    const menu = new StringSelectMenuBuilder()
      .setCustomId('product_menu')
      .setPlaceholder('Choose a product')
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
          ephemeral: true,
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
<a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932>
<a:plug_nitro:1374801855389106216> Nitro Boost [Login Method]  
> <:plug_boost:1374812787976700016> Nitro Boost 1 Month <:plug_arrow:1374782493491728394> **$6**  
> <:plug_booster:1374812926132752414> Nitro Boost 3 Months <:plug_arrow:1374782493491728394> **$9**

<a:plug_nitro_basic:1374814151737868349> Nitro Basic [Login Method]  
> <:plug_basic_wumpus:1374814681465884712> Nitro Basic 1 Month <:plug_arrow:1374782493491728394> **$1.99**  
> <:plug_nitro_wumpus:1374815093551927347> Nitro Basic 12 Months <:plug_arrow:1374782493491728394> **$22.5**
        `);

      const embed2 = new EmbedBuilder()
        .setColor(0xD391FA)
        .setTitle('**Payment & Features**')
        .setDescription(`
Accepted Payments: <a:plug_trade:1374822992709943387> **TRC-20 Crypto Only** | **USDT**

What You Get
<:plug_check:1374824992340054057> 100% Legit – Paid Through Discord  
<:plug_rocket:1374824938426597488> Activation In Just A Few Minutes  
<:plug_lock:1374824968160022538> We Only Log In To Activate  
<:plug_shield_check:1374824939999465502> 2FA Recommended For Extra Security  
<:plug_refresh:1374824936669057034> Full Refund Or Replacement Guarantee
        `)
        .setFooter({
          text: 'NitroPlug • Premium Discord Services',
          iconURL: 'https://i.imgur.com/TRZTCKT.png',
        });

      const button = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel('Start Order')
          .setStyle(ButtonStyle.Link)
          .setURL('https://example.com/order') // 👈 άλλαξέ το σε δικό σου link
          .setEmoji('🛒')
      );

      await interaction.editReply({
        embeds: [embed1, embed2],
        components: [button],
      });
    }

    // ✨ Αν θέλεις μπορώ να προσθέσω και το boosts εδώ
  }
});

client.login(process.env.TOKEN);
