const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;
const minecraftData = require("minecraft-data");

const mcData = minecraftData("1.19");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("enchant-info")
    .setDescription("Shows info about a Minecraft Enchantment")
    .addStringOption((option) =>
      option
        .setName("enchant-name")
        .setDescription("Enchantment Name eg: mending, unbreaking, etc")
        .setMaxLength(35)
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    // await wait(2000);

    try {
      const itemName = interaction.options.getString("enchant-name");

      console.log(itemName);

      const namei = mcData.enchantmentsByName[itemName].displayName.toString(10);
    //   const minem = mcData.blocksByName[blockName].diggable.toString(10);
      const lvli = mcData.enchantmentsByName[itemName].maxLevel.toString(10);
      const curse = mcData.enchantmentsByName[itemName].curse.toString(10);
    //   const objtype = mcData.blocksByName[blockName].boundingBox.toString(10);
      const excl = mcData.enchantmentsByName[itemName].exclude.toString(10);
      const trade = mcData.enchantmentsByName[itemName].tradeable.toString(10);

    //   const light = mcData.blocksByName[blockName].emitLight.toString(10);

      const exampleEmbed = new EmbedBuilder()
        .setColor(0x507ca5)
        // .setThumbnail("attachment://favicon.png")
        .setTitle("Minecraft Utilities")
        .setURL("https://mcutils.ashiqthedev.com")
        .setAuthor({ name: "Minecraft Utilities" })
        .addFields(
          { name: "Enchant Name", value: `\`\`\`${namei}\`\`\`` },
        //   { name: "Mineable", value: `\`\`\`${mine}\`\`\`` },
          { name: "Max Level", value: `\`\`\`${lvli}\`\`\`` },
          { name: "Cursed?", value: `\`\`\`${curse}\`\`\`` },
          { name: "Not Compitable With", value: `\`\`\`${excl}\`\`\`` },
          { name: "Tradeable?", value: `\`\`\`${trade}\`\`\`` },
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
