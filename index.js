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

> <a:plug_ask:1374778982402232471> What Makes Us Different

<:plug_arrow:1374782493491728394> • Zero Risk – 100% Safe & Verified Offers
<:plug_arrow:1374782493491728394> • Instant Delivery – No Waiting Around
<:plug_arrow:1374782493491728394> • Budget-Friendly – Premium Service At Low Prices
<:plug_arrow:1374782493491728394> • Round-The-Clock Help – Support When You Need It, Always
<a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932><a:plug_white_line:1374786910915919932>

**:warning: Important Notice**
All payments must be made via TRC-20 cryptocurrency only. :currency_exchange:
<a:plug_impression:1374779187918803004> Orders are processed exclusively through ticket requests on this server.
Do not trust direct messages or unofficial contacts.
`)
      .setFooter({
        text: 'NitroPlug • Premium Discord Services',
        iconURL: 'https://i.imgur.com/YOURLOGO.png', // Βάλε logo αν έχεις
      });

    const menu = new StringSelectMenuBuilder()
      .setCustomId('product_menu')
      .setPlaceholder('Choose a product')
      .addOptions([
        {
          label: 'Nitro',
          description: 'Classic & Boosted Nitro options',
          value: 'nitro',
          emoji: '💖',
        },
        {
          label: 'Boosts',
          description: 'Stable & Premium Boost packages',
          value: 'boosts',
          emoji: '🚀',
        },
      ]);

    const row = new ActionRowBuilder().addComponents(menu);

    await channel.send({ embeds: [embed], components: [row] });
  }
});

// Optional: interaction handler για slash commands
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

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
});

client.login(process.env.TOKEN);
