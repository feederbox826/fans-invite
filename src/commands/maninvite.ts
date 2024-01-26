// import types
import { SlashCommandBuilder } from "discord.js";
// custom types
import { CommandInt } from "../types/CommandInt";
// modules
import Logger from "../utils/logger";
// config
import { inviteTemplate } from "../utils/invite";

export const maninvite: CommandInt = {
  data: new SlashCommandBuilder()
    .setName("maninvite")
    .setDescription("send invite to user with manual invite key")
    .addUserOption(option =>
      option
        .setName("user")
        .setDescription("discord user to send invite to")
        .setRequired(true),
    )
    .addStringOption(option =>
      option
        .setName("invitekey")
        .setDescription("Invite key to send")
        .setRequired(false),
    ) as SlashCommandBuilder,
  run: async interaction => {
    // validate invite code
    const inviteRegex = new RegExp(
      /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/,
    );
    const inviteKey = interaction.options.getString("invitekey");
    if (!inviteRegex.test(inviteKey)) {
      Logger.debug(`Invalid invite key ${inviteKey}`);
      return interaction.reply({
        content: "❌ Invalid invite key",
        ephemeral: true,
      });
    }
    const user = interaction.options.getUser("user");
    // send invite with template
    const message = inviteTemplate(inviteKey);
    await user.send(message).catch(error => {
      Logger.error(`❌ Failed to send invite to ${user.username}: ${error}`);
      return interaction.reply({
        content: `Failed to send invite to ${user.username}: ${error}`,
        ephemeral: true,
      });
    });
    // success
    return interaction.reply({
      content: `✅ Sent invite to ${user.username}`,
      ephemeral: true,
    });
  },
};
