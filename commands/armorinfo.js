const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;
const minecraftData = require("minecraft-data");

const mcData = minecraftData("1.19");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("armor-info")
    .setDescription("Shows info about a Minecraft Armor")
    .addStringOption((option) =>
      option
        .setName("item-name")
        .setDescription("Item Name eg: iron_chestplate, netherite_leggings, etc")
        .setMaxLength(35)
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    // await wait(2000);

    try {
      const itemName = interaction.options.getString("item-name");

      console.log(itemName);

      const namei = mcData.itemsByName[itemName].displayName.toString(10);
    //   const minem = mcData.blocksByName[blockName].diggable.toString(10);
      const stacki = mcData.itemsByName[itemName].stackSize.toString(10);
      const repair = mcData.itemsByName[itemName].repairWith.toString(10);
    //   const objtype = mcData.blocksByName[blockName].boundingBox.toString(10);
      const durable = mcData.itemsByName[itemName].maxDurability.toString(10);

    //   const light = mcData.blocksByName[blockName].emitLight.toString(10);

      const exampleEmbed = new EmbedBuilder()
        .setColor(0x507ca5)
        // .setThumbnail("attachment://favicon.png")
        .setTitle("Minecraft Utilities")
        .setURL("https://mcutils.ashiqthedev.com")
        .setAuthor({ name: "Minecraft Utilities" })
        .addFields(
          { name: "Item Name", value: `\`\`\`${namei}\`\`\`` },
        //   { name: "Mineable", value: `\`\`\`${mine}\`\`\`` },
          { name: "Stack Size", value: `\`\`\`${stacki}\`\`\`` },
          { name: "Repairable with", value: `\`\`\`${repair}\`\`\`` },
          { name: "Durability", value: `\`\`\`${durable}\`\`\`` },
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
        content: "There has been an error, Please Try Again",
        ephemeral: true,
      });
    }
    return;
  },
};
