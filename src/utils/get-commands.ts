import * as commands from "@/commands";
import {
  DiscordCommand,
  DiscordSubcommand,
  DiscordSubcommandGroup,
} from "@/types";
import { ChatInputCommandInteraction } from "discord.js";

export function getCommands(): DiscordCommand<
  | ((interaction: ChatInputCommandInteraction<"cached">) => Promise<void>)
  | {
      subcommands: DiscordSubcommand[];
      subcommandGroups: DiscordSubcommandGroup[];
    }
>[] {
  return (Object.keys(commands) as (keyof typeof commands)[]).map(
    (key) => commands[key],
  );
}
