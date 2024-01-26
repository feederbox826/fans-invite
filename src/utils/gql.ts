// modules
import { gql, GraphQLClient } from "graphql-request";
// config
import { config } from "./config";

const InviteQuery = gql`
  mutation GenerateInviteCode {
    generateInviteCode
  }
`;

interface Invite {
  generateInviteCode: string;
}

const client = new GraphQLClient(`${config.stashbox.baseurl}/graphql`, {
  method: "POST",
  headers: {
    ApiKey: config.stashbox.apikey,
    "User-Agent": "feederbox826/fans-invite-bot",
  },
});

export async function getInvite(): Promise<string> {
  const data = (await client.request(InviteQuery).catch(error => {
    throw new Error(`Failed to get invite key: ${error}`);
  })) as Invite;
  return data.generateInviteCode;
}
