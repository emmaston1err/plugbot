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
      .setTitle('<:plug_ticket:1374774141873295381> Ticket')
      .setDescription(`
Browse Our Selection

<a:plug_dash:1374778714684002404> <:plug_arrow:1374782493491728394> **🛡️・We offer safe, verified, and high-quality services!**
> **💫・Trusted by our community — always fast & reliable.**

> ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

**📌・Why NitroPlug?**
> • 🎯 100% Safe & Legit – Zero risks  
> • ⚡ Instant Delivery – No delays  
> • 💎 Affordable Deals – Best prices for value  
> • 🛠️ 24/7 Support – We're here whenever you need us

> ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

**💼・Available Products**
> • 💖 **Nitro** — Classic & Boosted  
> • 🚀 **Boosts** — Stable & Premium  

> ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

**🌐・Purchases only through our [official website](https://example.com)**
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
