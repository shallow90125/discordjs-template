import { ClientEvents } from "discord.js";

export interface DiscordEvent<K extends keyof ClientEvents> {
  name: K;
  process: (...args: ClientEvents[K]) => Promise<void>;
}
