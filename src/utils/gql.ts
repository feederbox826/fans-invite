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
  errors?: [
    {
      message: string;
      path: string[];
    },
  ];
  data: {
    generateInviteCode: string;
  };
}

const client = new GraphQLClient(`${config.stashbox.baseurl}/graphql`, {
  method: "GET",
  headers: {
    ApiKey: config.stashbox.apikey,
    "User-Agent": "feederbox826/fans-invite-bot",
  },
});

export async function getInvite(): Promise<string> {
  const data = (await client.request(InviteQuery)) as Invite;
  if (data.errors) {
    throw new Error(data.errors[0].message);
  }
  return data.data.generateInviteCode;
}
