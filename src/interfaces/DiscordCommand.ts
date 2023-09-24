import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export interface DiscordCommand {
  command: SlashCommandBuilder;
  process: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
