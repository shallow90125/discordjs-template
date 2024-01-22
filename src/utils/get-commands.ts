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
      subcommands: [DiscordSubcommand, ...DiscordSubcommand[]];
      subcommandGroups: [DiscordSubcommandGroup, ...DiscordSubcommandGroup[]];
    }
>[] {
  return (Object.keys(commands) as (keyof typeof commands)[]).map(
    (key) => commands[key]
  );
}
