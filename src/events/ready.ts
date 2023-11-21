import { DiscordEvent } from "@/types";

export const ready = new DiscordEvent("ready", async (client) => {
  console.log(`ready: ${client.user.id}`);
});
