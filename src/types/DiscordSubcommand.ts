import {
  ChatInputCommandInteraction,
  SlashCommandSubcommandBuilder,
} from "discord.js";

export class DiscordSubcommand {
  readonly command: SlashCommandSubcommandBuilder;
  readonly listener: (
    interaction: ChatInputCommandInteraction<"cached">
  ) => Promise<void>;
  constructor({
    command,
    listener,
  }: {
    command: (
      command: SlashCommandSubcommandBuilder
    ) => SlashCommandSubcommandBuilder;
    listener: (
      interaction: ChatInputCommandInteraction<"cached">
    ) => Promise<void>;
  }) {
    this.command = command(new SlashCommandSubcommandBuilder());
    this.listener = listener;
  }
}
