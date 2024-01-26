// import types
import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
// custom types
import { CommandInt } from "../types/CommandInt";
// modules
import Logger from "../utils/logger";
// config
import { sendInvite } from "../utils/sendInvite";

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
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false) as SlashCommandBuilder,
  run: async interaction => {
    // validate invite code
    const user = interaction.options.getUser("user");
    const inviteKey = interaction.options.getString("invitekey");
    return await sendInvite(user, inviteKey)
      .then(() =>
        interaction.reply({
          content: `✅ Sent invite to ${user.username}`,
          ephemeral: true,
        }),
      )
      .catch(error => {
        Logger.error(`❌ Failed to send invite to ${user.username}: ${error}`);
        return interaction.reply({
          content: `Failed to send invite to ${user.username}: ${error}`,
          ephemeral: true,
        });
      });
  },
};
