import { DiscordCommand } from "@/types";
import { SlashCommandBuilder } from "discord.js";

export const ababa = new DiscordCommand(
  new SlashCommandBuilder().setName("ababa").setDescription("ababa"),
  async (interaction) => {
    await interaction.reply("ababa");
  },
);
