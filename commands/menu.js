const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
  name: 'postmenu',
  description: 'sends the nitro/boosts menu',
  execute: async (client, interaction) => {
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

    await interaction.reply({ embeds: [embed], components: [row] });
  },
};
