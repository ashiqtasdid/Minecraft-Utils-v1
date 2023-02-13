const { SlashCommandBuilder } = require("discord.js");
const util = require("minecraft-server-util");
const { EmbedBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("java")
    .setDescription("Shows info about a Minecraft Java server")
    .addStringOption((option) =>
      option
        .setName("server-ip")
        .setDescription("IP address of the server")
        .setMaxLength(30)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("port")
        .setDescription(
          "Port of the server (Default - 25565, If you do not know the server port then use the default one)"
        )
        .setMaxLength(5)
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    // await wait(2000);
    const ip = interaction.options.getString("server-ip");
    const port = interaction.options.getString("port");
    util
      .status(ip, parseInt(port))
      .then((response) => {
        // console.log(response)
        console.log(response.players.online);
        console.log(response.players.max);
        console.log(response.version.name);
        console.log(response.roundTripLatency);

        const plon = response.players.online.toString(10);
        const plmx = response.players.max.toString(10);
        const vrsn = response.version.name.toString(10);
        const ping = response.roundTripLatency.toString(10);

        const exampleEmbed = new EmbedBuilder()
          .setColor(0x507ca5)
          .setThumbnail("attachment://favicon.png")
          .setTitle("Minecraft Utilities")
          .setURL("https://mcutils.ashiqthedev.com")
          .setAuthor({ name: "Minecraft Utilities" })
          .addFields(
            { name: "Players Online", value: `\`\`\`${plon}\`\`\`` },
            { name: "Players Max", value: `\`\`\`${plmx}\`\`\`` },
            { name: "Server Version", value: `\`\`\`${vrsn}\`\`\`` },
            { name: "Ping", value: `\`\`\`${ping}ms\`\`\`` },
            {
              name: "MOTD",
              value: `\`\`\`
          ${response.motd.clean}\`\`\``,
            }
          );

        interaction.editReply({
          files: [
            {
              attachment: Buffer.from(response.favicon.split(",")[1], "base64"),
              name: "favicon.png",
            },
          ],
          embeds: [exampleEmbed],
        });

        return;
      })

      .catch((error) => {
        interaction.editReply({ content: `\`${error}\``, ephemeral: true });
        console.log(error);
      });
  },
};
