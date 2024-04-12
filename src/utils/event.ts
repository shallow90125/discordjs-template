import { Glob } from "bun";
import { DiscordEvent } from "types/discord";

export const events: DiscordEvent[] = [];

const eventsGlob = new Glob("events/*.ts");
for await (const path of eventsGlob.scan("src")) {
  const file = await import(path);
  if (file.default instanceof DiscordEvent) events.push(file.default);
}
