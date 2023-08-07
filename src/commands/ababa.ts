import { SlashCommandBuilder } from "discord.js";
import { DiscordCommand } from "../interfaces/DiscordCommand";

export const ababa: DiscordCommand = {
  command: new SlashCommandBuilder().setName("ababa").setDescription("ababa"),
  proccess: async (interaction) => {
    return await interaction.reply("ababa");
  },
};
