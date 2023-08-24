import { DiscordEvent } from "@/interfaces";

export const ready: DiscordEvent<"ready"> = {
  name: "ready",
  process: async (client) => {
    console.log(`ready: ${client.user.id}`);
  },
};
