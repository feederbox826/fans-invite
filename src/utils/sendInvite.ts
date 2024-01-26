import { User } from "discord.js";
import { getInvite } from "./gql";
import { inviteTemplate } from "./invite";

export async function sendInvite(user: User, inviteKey?: string) {
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
  return await user.send(message).catch(error => {
    throw Error(`Failed to send invite to ${user.username}: ${error}`);
  });
}
