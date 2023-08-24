import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export interface DiscordCommand {
  command: SlashCommandBuilder;
  proccess: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
