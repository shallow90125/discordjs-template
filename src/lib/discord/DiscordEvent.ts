import type { ClientEvents } from 'discord.js'

export class DiscordEvent<T extends keyof ClientEvents = keyof ClientEvents> {
  constructor(
    readonly event: T,
    readonly listener: (...args: ClientEvents[T]) => Promise<void>,
  ) {}
}
