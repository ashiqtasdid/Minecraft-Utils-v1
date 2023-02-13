const { SlashCommandBuilder } = require('discord.js');
const util = require('minecraft-server-util');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bed-rock')
    .setDescription('Shows info about a Minecraft Bedrock server')
    .addStringOption(option =>
      option.setName('server-ip')
        .setDescription('IP address of the server')
        .setMaxLength(30)
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('port')
        .setDescription('Port of the server (Default - 19132, If you do not know the server port then use the default one)')
        .setMaxLength(5)
        .setRequired(true)
    ),


  async execute(interaction) {
    const ip = interaction.options.getString('server-ip');
    const port = interaction.options.getString('port')

    util.statusBedrock(ip, parseInt((port))).then((response) => {

      // console.log(response)
      console.log(response.players.online)
      console.log(response.players.max)
      console.log(response.version.name)
      console.log(response.roundTripLatency)

      const plon = (response.players.online).toString(10)
      const plmx = (response.players.max).toString(10)
      const vrsn = (response.version.name).toString(10)

      const exampleEmbed = new EmbedBuilder()
        .setColor(0x13FF00)
        .setTitle('Minecraft Server Checker')
        .setURL('https://beta.ashiqthedev.com/mcsrv-checker/')
        .setAuthor({ name: 'Ashiq The Dev Inc.' })
        .addFields(
          { name: 'Players Online', value: plon },
          { name: 'Players Max', value: plmx },
          { name: 'Server Version', value: vrsn },
          { name: 'MOTD', value: response.motd.clean }
        )

      interaction.reply({
        embeds: [exampleEmbed]
      });

      return
    })
      .catch((error) => {
        interaction.reply({ content: 'There has been an error, Please Try Again', ephemeral: true });
        console.log(error)
      })
  },
};