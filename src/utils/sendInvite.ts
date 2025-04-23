import { User, ChatInputCommandInteraction, RateLimitError } from "discord.js";
import { getInvite } from "./gql";
import { inviteTemplate } from "./invite";

async function sendInviteToUser(user: User, inviteKey?: string) {
  // validate invite key
  const inviteRegex = new RegExp(
    /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/,
  );
  if (!inviteKey) {
    // get invite key
    inviteKey = await getInvite().catch(error => {
      throw Error(`Failed to get invite key: ${error}`);
    });
  } else if (inviteKey && !inviteRegex.test(inviteKey)) {
    throw Error("Invalid invite key format");
  }
  // generate message
  const message = inviteTemplate(inviteKey);
  // send invite
  return await user.send(message)
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function handleInvite(interaction: ChatInputCommandInteraction, user: User, inviteKey?: string) {
  await sendInviteToUser(user, inviteKey)
    .then(() =>
      interaction.reply({
        content: `✅ Sent invite to ${user.username}`,
        ephemeral: true,
      }),
    )
    .catch(async error => {
      // catch ratelimit error
      if (error instanceof RateLimitError) {
        const retry_time = error.retryAfter;
        interaction.reply({
          content: `Ratelimited sending invite to ${user.username}, retrying in ${retry_time}ms...`,
          ephemeral: true,
        });
        // start delay
        await delay(retry_time);
        // followup
        await sendInviteToUser(user, inviteKey)
          .then(() =>
            interaction.followUp({
              content: `✅ Sent invite to ${user.username}`,
              ephemeral: true,
            }),
          )
          .catch(async error => {
            console.error(`Failed to send invite to ${user.username}: ${error}`);
            return interaction.followUp({
              content: `Failed to send invite to ${user.username}: ${error}`,
              ephemeral: true,
            });
          });
      }
      // generic error
      console.error(`❌ Failed to send invite to ${user.username}: ${error}`);
      return interaction.reply({
        content: `Failed to send invite to ${user.username}: ${error}`,
        ephemeral: true,
      });
    }
  );
}