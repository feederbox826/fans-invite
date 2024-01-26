// import types
import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
// custom types
import { CommandInt } from "../types/CommandInt";
// modules
import Logger from "../utils/logger";
// config
import { inviteTemplate } from "../utils/invite";
import { getInvite } from "../utils/gql";

export const autoinvite: CommandInt = {
  data: new SlashCommandBuilder()
    .setName("autoinvite")
    .setDescription("send invite to user with auto invite key")
    .addUserOption(option =>
      option
        .setName("user")
        .setDescription("discord user to send invite to")
        .setRequired(true),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false) as SlashCommandBuilder,
  run: async interaction => {
    // get invite key
    const user = interaction.options.getUser("user");
    const inviteKey = await getInvite().catch(error => {
      Logger.error(`Failed to get invite key: ${error}`);
      interaction.reply({
        content: `❌ Failed to get invite key: ${error}`,
        ephemeral: true,
      });
    });
    if (!inviteKey) {
      return Logger.error("❌ Failed to get invite key - no error");
    }
    // send invite with template
    const message = inviteTemplate(inviteKey);
    await user
      .send(message)
      .catch(error => {
        Logger.error(`Failed to send invite to ${user.username}: ${error}`);
        interaction.reply({
          content: `❌ Failed to send invite to ${user.username}: ${error}`,
          ephemeral: true,
        });
      })
      .then(() => {
        // success
        interaction.reply({
          content: `✅ Sent invite to ${user.username}`,
          ephemeral: true,
        });
      });
  },
};
