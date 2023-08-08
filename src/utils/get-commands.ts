import * as commands from "../commands/index.js";
import { DiscordCommand } from "../interfaces/DiscordCommand";

export function getCommands(): DiscordCommand[] {
  return (Object.keys(commands) as (keyof typeof commands)[]).map(
    (key) => commands[key],
  );
}
