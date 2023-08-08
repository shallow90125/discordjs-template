import { Awaitable, ClientEvents } from "discord.js";

export interface DiscordEvent<K extends keyof ClientEvents> {
  event: K;
  listener: (...args: ClientEvents[K]) => Awaitable<void>;
}
