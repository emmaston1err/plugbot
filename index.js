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
  const channel = client.channels.cache.get('1373321172841664666');
  if (channel && channel.type === ChannelType.GuildText) {
    const embed = new EmbedBuilder()
      .setColor(0xD391FA)
      .setTitle('**<:plug_ticket:1374774141873295381> Ticket**')
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
<a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932>
**:warning: Important Notice**
<a:plug_impression:1374779187918803004> All payments must be made via TRC-20 cryptocurrency only. Orders are processed exclusively through ticket requests on this server. Do not trust direct messages or unofficial contacts.
`)
      .setFooter({
        text: 'NitroPlug • Premium Discord Services',
        iconURL: 'https://i.imgur.com/TRZTCKT.png', // Βάλε logo αν έχεις
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
  // 👉 Slash command
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

  // 👉 Select menu (dropdown)
  if (interaction.isStringSelectMenu()) {
    const selected = interaction.values[0];

    if (selected === 'nitro') {
      const nitroEmbed = new EmbedBuilder()
        .setColor(0xD391FA)
        .setTitle('Discord Nitro')
        .setDescription(`
**Instant & legal**

## Nitro Boosts [ via login ] <:plug_login:1374803692300298342>
<:plug_boost:1374801892152053912> Nitro Boost 1 Month — **$6.5**  
<:plug_boost:1374801892152053912> Nitro Boost 12 Month — **$55.5**

## Nitro Basic [ via login ] <:plug_login:1374803692300298342>
<:plug_nitro:1374801855389106216> Nitro Basic 1 Month — **$1.99**  
<:plug_nitro:1374801855389106216> Nitro Basic 12 Month — **$22.5**

## 🧾 Payment Methods  
<:plug_trc:1374802353647286344> TRC-20  &  <:plug_usdt:1374802351137445909> USDT

## ⭐ Features
> ✅ Legally Paid  
> ⚡ Fast activation within minutes  
> 🔐 We only log in to activate — full privacy respected  
> 🛡️ We recommend enabling **2FA**  
> 💬 Full guarantee for any issue
        `)
        .setFooter({
          text: 'NitroPlug • Trusted Discord Services',
          iconURL: 'https://i.imgur.com/TRZTCKT.png',
        });

      const button = new ActionRowBuilder().addComponents(
        {
          type: 2,
          style: 5,
          label: 'Start Order',
          url: 'https://example.com/order', // 👉 βάλε πραγματικό σου URL
          emoji: '🛒',
        }
      );

      await interaction.reply({
        embeds: [nitroEmbed],
        components: [button],
        ephemeral: true,
      });
    }

    // Αν θες, πρόσθεσε εδώ και το boosts αντίστοιχα
  }
});


client.login(process.env.TOKEN);
