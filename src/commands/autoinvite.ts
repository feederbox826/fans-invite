// import types
import { SlashCommandBuilder, PermissionFlagsBits, RateLimitError, InteractionContextType } from "discord.js";
// custom types
import { CommandInt } from "../types/CommandInt";
// config
import { handleInvite } from "../utils/sendInvite";


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
    .setContexts([InteractionContextType.Guild]) as SlashCommandBuilder,
  run: async interaction => {
    // get invite key
    const user = interaction.options.getUser("user");
    return await handleInvite(interaction, user)
  },
};
