const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;
const minecraftData = require("minecraft-data");

const mcData = minecraftData("1.19");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("food-info")
    .setDescription("Shows info about a Minecraft Food Item")
    .addStringOption((option) =>
      option
        .setName("food-name")
        .setDescription("Food Name eg: cooked_potato, golden_apple, etc")
        .setMaxLength(35)
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    // await wait(2000);

    try {
      const itemName = interaction.options.getString("food-name");

      console.log(itemName);

      const namei = mcData.foodsByName[itemName].displayName.toString(10);
    //   const minem = mcData.blocksByName[blockName].diggable.toString(10);
      const stacki = mcData.foodsByName[itemName].stackSize.toString(10);
      const foodp = mcData.foodsByName[itemName].foodPoints.toString(10);
    //   const objtype = mcData.blocksByName[blockName].boundingBox.toString(10);
      const satur = mcData.foodsByName[itemName].saturation.toString(10);

    //   const light = mcData.blocksByName[blockName].emitLight.toString(10);

      const exampleEmbed = new EmbedBuilder()
        .setColor(0x507ca5)
        // .setThumbnail("attachment://favicon.png")
        .setTitle("Minecraft Utilities")
        .setURL("https://mcutils.ashiqthedev.com")
        .setAuthor({ name: "Minecraft Utilities" })
        .addFields(
          { name: "Food Name", value: `\`\`\`${namei}\`\`\`` },
        //   { name: "Mineable", value: `\`\`\`${mine}\`\`\`` },
          { name: "Stack Size", value: `\`\`\`${stacki}\`\`\`` },
          { name: "Food Point (Higher is better)", value: `\`\`\`${foodp}\`\`\`` },
          { name: "Saturation (Higher is better)", value: `\`\`\`${satur}\`\`\`` },
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
