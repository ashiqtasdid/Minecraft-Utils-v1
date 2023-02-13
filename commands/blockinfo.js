const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;
const minecraftData = require("minecraft-data");

const mcData = minecraftData("1.19");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("block-info")
    .setDescription("Shows info about a Minecraft Block")
    .addStringOption((option) =>
      option
        .setName("block-name")
        .setDescription("Block Name")
        .setMaxLength(35)
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    // await wait(2000);

    try {
      const blockName = interaction.options.getString("block-name");

      console.log(blockName);

      const namem = mcData.blocksByName[blockName].displayName.toString(10);
      const minem = mcData.blocksByName[blockName].diggable.toString(10);
      const stackm = mcData.blocksByName[blockName].stackSize.toString(10);
      const mmb = mcData.blocksByName[blockName].material.toString(10);
      const objtype = mcData.blocksByName[blockName].boundingBox.toString(10);
      const hard = mcData.blocksByName[blockName].hardness.toString(10);

      const light = mcData.blocksByName[blockName].emitLight.toString(10);

      const exampleEmbed = new EmbedBuilder()
        .setColor(0x507ca5)
        // .setThumbnail("attachment://favicon.png")
        .setTitle("Minecraft Utilities")
        .setURL("https://mcutils.ashiqthedev.com")
        .setAuthor({ name: "Minecraft Utilities" })
        .addFields(
          { name: "Block Name", value: `\`\`\`${namem}\`\`\`` },
          { name: "Mineable", value: `\`\`\`${minem}\`\`\`` },
          { name: "Stack Size", value: `\`\`\`${stackm}\`\`\`` },
          { name: "Mineable with (Default = Not Mineable)", value: `\`\`\`${mmb}\`\`\`` },
          { name: "Object Type", value: `\`\`\`${objtype}\`\`\`` },
          {
            name: "Does it emit light? ( >0 (greater than 0), means it emits light)",
            value: `\`\`\`${light}\`\`\``,
          },
          {
            name: "Hardness (Higher Means, It takes more time to mine)",
            value: `\`\`\`${hard}\`\`\``,
          }
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
    } catch (error) {
      interaction.editReply({
        content: "There has been an error, Please Try Again",
        ephemeral: true,
      });
    }
    return;
  },
};
