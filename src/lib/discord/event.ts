import { Glob } from 'bun'

import { DiscordEvent } from './DiscordEvent'

export const events: DiscordEvent[] = []

const eventsGlob = new Glob('src/events/**/*.ts')
for await (const path of eventsGlob.scan('.')) {
  const file = await import(path)
  if (file.default instanceof DiscordEvent) events.push(file.default)
}
