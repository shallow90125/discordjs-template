import {
  ChatInputCommandInteraction,
  SlashCommandSubcommandBuilder,
} from "discord.js";
import { DiscordCommandListener } from "./DiscordCommandListener";

export class DiscordSubcommand {
  readonly command: SlashCommandSubcommandBuilder;
  readonly listener: DiscordCommandListener;
  constructor({
    command,
    listener,
  }: {
    command: (
      command: SlashCommandSubcommandBuilder
    ) => SlashCommandSubcommandBuilder;
    listener: DiscordCommandListener;
  }) {
    this.command = command(new SlashCommandSubcommandBuilder());
    this.listener = listener;
  }
}
