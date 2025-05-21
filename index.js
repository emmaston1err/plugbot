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
    ChannelType 
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
  
  // Φορτώνουμε τα commands
  client.commands = new Collection();
  const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
  }
  
  // ✅ Εδώ τώρα επιτρέπεται το client.once
  client.once('ready', async () => {
    console.log(`✅ Συνδέθηκε ως ${client.user.tag}`);
  
    // 🔄 Register Slash Commands
    const commands = [
      new SlashCommandBuilder().setName('postmenu').setDescription('Στέλνει το Nitro menu'),
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
  
    // 🔁 Στείλε το embed σε κανάλι
    const channel = client.channels.cache.get('1373321172841664666');
    if (channel && channel.type === ChannelType.GuildText) {
      const embed = new EmbedBuilder()
        .setTitle('🛍️ Choose Your Product')
        .setDescription(`
  ✨ **We provide premium Discord services at unbeatable prices!**
  
  🔐 **Trusted & Secure**
  💨 **Instant Delivery**
  💸 **Affordable & Verified**
  
  __**What We Offer:**__
  > 🪄 **Nitro** — Classic & Boosted options  
  > 🚀 **Server Boosts** — Quality guaranteed  
  
  🔗 Purchases only through our [official website](https://example.com)
  `)
        .setColor(0xE091E6)
        .setFooter({ text: 'NitroPlug Services – Fast • Secure • Trusted' });
  
      const menu = new StringSelectMenuBuilder()
        .setCustomId('product_menu')
        .setPlaceholder('Choose a product')
        .addOptions([
          {
            label: 'Nitro',
            description: 'Nitro Classic & Boosted',
            value: 'nitro',
            emoji: '🪄',
          },
          {
            label: 'Boosts',
            description: 'Server Boost packages',
            value: 'boosts',
            emoji: '🚀',
          },
        ]);
  
      const row = new ActionRowBuilder().addComponents(menu);
      await channel.send({ embeds: [embed], components: [row] });
    }
  });
  
  // Interaction handler
  client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
  
    const command = client.commands.get(interaction.commandName);
    if (command) {
      try {
        await command.execute(client, interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: '❌ Κάτι πήγε στραβά.', ephemeral: true });
      }
    }
  });
  
  client.login(process.env.TOKEN);
  
