import { config } from "./config";

export const inviteTemplate = (invite: string) => `Hi, 

your FansDB invite key: \`${invite}\`

See https://docs.fansdb.cc/#accessing-fansdb for more details.

If you have any issues contact ${config.invite.contactPerson} or post in the ${config.invite.contactChannel} channel.
`;