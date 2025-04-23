// import types
import { SlashCommandBuilder } from "discord.js";
// custom types
import { CommandInt } from "../types/CommandInt";
// module
import { handleInvite } from "../utils/sendInvite";

export const testinvite: CommandInt = {
  data: new SlashCommandBuilder()
    .setName("testinvite")
    .setDescription("test sending me an invite") as SlashCommandBuilder,
  run: async interaction => {
    // validate invite code
    const user = interaction.options.getUser("user");
    const inviteKey = interaction.options.getString("invitekey");
    return await handleInvite(interaction, user, "not-a-real-invite-key")
  }
};
