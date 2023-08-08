import {
  ChatInputCommandInteraction,
  InteractionResponse,
  SlashCommandBuilder,
} from "discord.js";

export interface DiscordCommand {
  command: SlashCommandBuilder;
  proccess: (
    interaction: ChatInputCommandInteraction,
  ) => Promise<InteractionResponse<boolean>>;
}
