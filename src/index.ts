// types
import { Client } from "discord.js";
// events
import { onReady } from "./events/onReady";
import { onInteraction } from "./events/onInteraction";
// modules
// config
import { config } from "./utils/config";
import Logger from "./utils/logger";

// setup db
const client = new Client({
  intents: [],
});

// discord events
client.on("ready", async () => {
  await onReady(client);
});
client.on(
  "interactionCreate",
  async interaction => await onInteraction(interaction),
);
client.on("rateLimit", data => {
  Logger.debug("rate limited" + JSON.stringify(data));
  Logger.debug("lifted in " + data.timeout);
});

// startup
client.login(config.discord.token);
