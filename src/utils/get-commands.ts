import * as commands from "@/commands";
import { DiscordCommand } from "@/types";

export function getCommands(): DiscordCommand[] {
  return (Object.keys(commands) as (keyof typeof commands)[]).map(
    (key) => commands[key],
  );
}
