import { DiscordEvent } from "types";

export default new DiscordEvent("ready", async (client) => {
  console.log(`ready: ${client.user.id}`);
});
