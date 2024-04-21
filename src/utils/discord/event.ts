import { Glob } from "bun";
import { DiscordEvent } from "types/discord";

export const events: DiscordEvent[] = [];

const glob = new Glob("events/**/*.ts");
for await (const path of glob.scan("src")) {
  const file = (await import(path)).default;
  if (file instanceof DiscordEvent) {
    events.push(file);
  }
}
