import {
  ChatInputCommandInteraction,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";

export class DiscordCommand {
  constructor(
    readonly command: SlashCommandSubcommandsOnlyBuilder,
    readonly listener: (
      interaction: ChatInputCommandInteraction,
    ) => Promise<void>,
  ) {}
}
