import { DiscordCommand } from "@/interfaces";
import { SlashCommandBuilder } from "discord.js";

export const ababa: DiscordCommand = {
  command: new SlashCommandBuilder().setName("ababa").setDescription("ababa"),
  proccess: async (interaction) => {
    return await interaction.reply("ababa");
  },
};
