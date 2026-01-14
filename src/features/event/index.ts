import type { ClientEvents } from 'discord.js'

export const defineEvent = <T extends keyof ClientEvents>(
  name: T,
  handler: (...args: ClientEvents[T]) => Promise<unknown>
) =>
  ({ handler, name }) as {
    handler: <U extends keyof ClientEvents>(...args: ClientEvents[U]) => Promise<unknown>
    name: T
  }
