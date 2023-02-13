const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;
const minecraftData = require("minecraft-data");

const mcData = minecraftData("1.19");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mob-info")
    .setDescription("Shows info about a Minecraft Mob")
    .addStringOption((option) =>
      option
        .setName("mob-name")
        .setDescription("Mob Name eg: villager, zombie, etc")
        .setMaxLength(35)
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    // await wait(2000);

    try {
      const mobName = interaction.options.getString("mob-name");

      console.log(mobName);

      const namei = mcData.entitiesByName[mobName].displayName.toString(10);
    //   const minem = mcData.blocksByName[blockName].diggable.toString(10);
      const heighti = mcData.entitiesByName[mobName].height.toString(10);
      const type = mcData.entitiesByName[mobName].type.toString(10);
    //   const objtype = mcData.blocksByName[blockName].boundingBox.toString(10);
      const category = mcData.entitiesByName[mobName].category.toString(10);

    //   const light = mcData.blocksByName[blockName].emitLight.toString(10);

      const exampleEmbed = new EmbedBuilder()
        .setColor(0x507ca5)
        // .setThumbnail("attachment://favicon.png")
        .setTitle("Minecraft Utilities")
        .setURL("https://mcutils.ashiqthedev.com")
        .setAuthor({ name: "Minecraft Utilities" })
        .addFields(
          { name: "Mob Name", value: `\`\`\`${namei}\`\`\`` },
        //   { name: "Mineable", value: `\`\`\`${mine}\`\`\`` },
          { name: "Mob Height (Blocks)", value: `\`\`\`${heighti}\`\`\`` },
          { name: "Mob Type", value: `\`\`\`${type}\`\`\`` },
          { name: "Mob Category", value: `\`\`\`${category}\`\`\`` },
        //   {
        //     name: "Does it emit light? ( >0 (greater than 0), means it emits light)",
        //     value: `\`\`\`${light}\`\`\``,
        //   },
        //   {
        //     name: "Hardness (Higher Means, It takes more time to mine)",
        //     value: `\`\`\`${hard}\`\`\``,
        //   }
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
        content: `\`\`\`There has been an error, Please Try Again\`\`\``,
        ephemeral: true,
      });
    }
    return;
  },
};
