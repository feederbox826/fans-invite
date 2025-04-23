// import types
import { SlashCommandBuilder, PermissionFlagsBits, InteractionContextType } from "discord.js";
// custom types
import { CommandInt } from "../types/CommandInt";
// config
import { handleInvite } from "../utils/sendInvite";

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
    .setContexts([InteractionContextType.Guild]) as SlashCommandBuilder,
  run: async interaction => {
    // validate invite code
    const user = interaction.options.getUser("user");
    const inviteKey = interaction.options.getString("invitekey");
    return await handleInvite(interaction, user, inviteKey)
  }
};
