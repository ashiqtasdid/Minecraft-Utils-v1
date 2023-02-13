const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const mc = require('minecraft_head'); // Import Module

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skin")
    .setDescription("Provides a download link a Player Skin")
    .addStringOption((option) =>
      option
        .setName("player-name")
        .setDescription("Name of the player")
        .setMaxLength(30)
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const name = interaction.options.getString("player-name");
    const option = interaction.options.getString("cape");
    const com = "skin"
    console.log(name)
    console.log('skin')

    const player = new mc.player(name);

    mc.getSkin(player)
      .then(data => {
        // console.log(data.skin)
        // console.log(response)

        const skin = data.skin;
        const cape = data.cape;

        console.log(skin)
        const exampleEmbed = new EmbedBuilder()
          .setColor(0x13ff00)
          // .setThumbnail("attachment://favicon.png")
          .setTitle("Minecraft Utilities")
          .setURL("https://mcutils.ashiqthedev.com")
          .setAuthor({ name: "Minecraft Utilities" })
          .addFields(
            { name: `Skin of ${name}`, value: `\`\`\`${skin}\`\`\`` },
          );

        interaction.editReply({
          files: [
            {
              attachment: "https://i.ibb.co/BsGFbSD/rsz-1pngwingcom-1.png",
              name: "favicon.png",
            },
          ],
          embeds: [exampleEmbed],
          ephemeral: true,
        });

        return;
      })
      .catch((error) => {
        interaction.reply({
          content: "There has been an error, Please Try Again",
          ephemeral: true,
        });
        console.log(error);
      });
  },
};
