// import types
import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
// custom types
import { CommandInt } from "../types/CommandInt";
// modules
import Logger from "../utils/logger";
// config
import { sendInvite } from "../utils/sendInvite";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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

    // add small delay (1000 milliseconds = 1 second)
    await delay(1000);

    return await sendInvite(user)
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
