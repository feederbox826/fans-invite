interface Config {
  logging: boolean;
  discord: {
    token: string;
    clientId: string;
    guilds: string[];
  };
  stashbox: {
    baseurl: string;
    apikey: string;
  };
  invite: {
    contactPerson: string;
    contactChannel: string;
  }
}

import * as untypedConfig from "../config.json";
const config: Config = untypedConfig;
export { config };
export default config;
