import type { ChatInputCommandInteraction, Message } from 'discord.js'

export type DiscordCommandListener = (interaction: ChatInputCommandInteraction<'cached'>) => Promise<Message<true>>
