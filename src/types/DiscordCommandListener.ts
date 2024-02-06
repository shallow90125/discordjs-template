import { ChatInputCommandInteraction } from "discord.js";

export type DiscordCommandListener = (
  interaction: ChatInputCommandInteraction<"cached">
) => Promise<void>;
