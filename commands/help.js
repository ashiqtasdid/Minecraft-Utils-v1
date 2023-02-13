const { SlashCommandBuilder, inlineCode } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
// const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Help regarding the bot'),
  async execute(interaction) {
    const exampleEmbed = new EmbedBuilder()
      .setTitle('Help - Minecraft Utilities')
      .setColor(0x3424D8)
      .addFields(
        { name: 'Website', value: "https://mcutils.ashiqthedev.com" },
        { name: 'Support', value: "mail us at `admin@ashiqthedev.com`" },
        { name: 'Commands', value: "https://mcutils.ashiqthedev.com/commands" },
        { name: 'Parent Company', value: "Ashiq The Dev Inc." },
        { name: 'Twitter', value: "https://twitter.com/mc_utilities" },
       
      )

    // .setFooter('Minecraft Server Checker');

    await interaction.reply({ embeds: [exampleEmbed], ephemeral: true });
  },
};