import * as commands from "@/commands";
import { DiscordCommand } from "@/interfaces";

export function getCommands(): DiscordCommand[] {
  return (Object.keys(commands) as (keyof typeof commands)[]).map(
    (key) => commands[key],
  );
}
