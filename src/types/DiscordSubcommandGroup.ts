import { SlashCommandSubcommandGroupBuilder } from "discord.js";
import { DiscordSubcommand } from "./DiscordSubcommand";

export class DiscordSubcommandGroup {
  readonly command: SlashCommandSubcommandGroupBuilder;
  readonly subcommands: [DiscordSubcommand, ...DiscordSubcommand[]];
  constructor({
    command,
    subcommands,
  }: {
    command: (
      subcommandGroups: SlashCommandSubcommandGroupBuilder
    ) => SlashCommandSubcommandGroupBuilder;
    subcommands: [DiscordSubcommand, ...DiscordSubcommand[]];
  }) {
    this.subcommands = subcommands;
    this.command = command(new SlashCommandSubcommandGroupBuilder());

    for (const subcommand of this.subcommands) {
      this.command.addSubcommand(subcommand.command);
    }
  }
}
