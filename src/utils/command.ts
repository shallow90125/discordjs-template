import { Glob } from "bun";
import { DiscordCommand } from "types/discord";

export const commands: DiscordCommand[] = [];

const commandsGlob = new Glob("commands/**/*.ts");
for await (const path of commandsGlob.scan("src")) {
  const file = await import(path);
  if (file.default instanceof DiscordCommand) commands.push(file.default);
}
