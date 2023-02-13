const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const mc = require('minecraft_head'); // Import Module

module.exports = {
  data: new SlashCommandBuilder()
    .setName("uuid")
    .setDescription("Provides the UUID of the provided Minecraft Username")
    .addStringOption((option) =>
      option
        .setName("player-name")
        .setDescription("Name of the player")
        .setMaxLength(30)
        .setRequired(true)
    ),

  async execute(interaction) {
    // await interaction.deferReply({ ephemeral: true });
    const name = interaction.options.getString("player-name");

    console.log(name)
    console.log('UUID')

    const player = new mc.player(name);

    mc.nameToUuid(player)
      .then(data => {
        // console.log(data.uuid)
        // console.log(response)


        const uuid = data.uuid;
        // const cape = data.cape;

        const exampleEmbed = new EmbedBuilder()
          .setColor(0x13ff00)
          // .setThumbnail("attachment://favicon.png")
          .setTitle("Minecraft Utilities")
          .setURL("https://beta.ashiqthedev.com/mcsrv-checker/")
          .setAuthor({ name: "Ashiq The Dev Inc." })
          .addFields(
            { name: `UUID of ${name}`, value: `\`\`\`${uuid}\`\`\`` },
          );

        interaction.reply({
       
          embeds: [exampleEmbed],
          ephemeral: true,
        });

        return;
      })
      .catch((error) => {
        interaction.reply({
          content: `\`\`\`"There has been an error, Please Try Again"\`\`\``,
          ephemeral: true,
        });
        console.log(error);
      });
  },
};
