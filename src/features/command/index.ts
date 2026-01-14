import {
  type ChatInputCommandInteraction,
  type Guild,
  type SlashCommandSubcommandBuilder,
  type SlashCommandSubcommandGroupBuilder,
  type SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js'
import { ResultAsync } from 'neverthrow'

import { ErrorMessage } from '@/types'

type Command = {
  command: SlashCommandSubcommandsOnlyBuilder
  handler: (interaction: ChatInputCommandInteraction) => Promise<unknown>
}
export const createCommandRouter = (...commands: [Command, ...Command[]]) =>
  ResultAsync.fromThrowable(async (interaction: ChatInputCommandInteraction) => {
    const command = commands.find(({ command }) => command.name === interaction.commandName)
    if (!command) {
      throw new Error(`Command not found: ${interaction.commandName}`)
    }
    return command?.handler(interaction)
  }, ErrorMessage)

export const onInteractionFailed = (interaction: ChatInputCommandInteraction) =>
  ResultAsync.fromThrowable(
    async (e: ErrorMessage) => {
      if (interaction.replied) return
      if (interaction.deferred) return interaction.editReply(`🔸 ${e}`)
      return interaction.reply(`🔸 ${e}`)
    },
    (e) => ErrorMessage(e)
  )

type SubcommandGroup = {
  group: SlashCommandSubcommandGroupBuilder
  handler: (interaction: ChatInputCommandInteraction) => Promise<unknown>
}
export const createSubcommandGroupRouter =
  (...groups: [SubcommandGroup, ...SubcommandGroup[]]) =>
  async (interaction: ChatInputCommandInteraction) =>
    groups
      .find(({ group }) => group.name === interaction.options.getSubcommandGroup())
      ?.handler(interaction)

type Subcommand = {
  handler: (interaction: ChatInputCommandInteraction) => Promise<unknown>
  subcommand: SlashCommandSubcommandBuilder
}
export const createSubcommandRouter =
  (...subcommands: [Subcommand, ...Subcommand[]]) =>
  async (interaction: ChatInputCommandInteraction) =>
    subcommands
      .find(({ subcommand }) => subcommand.name === interaction.options.getSubcommand())
      ?.handler(interaction)

// interaction
export const getInteractionGuild = async (interaction: ChatInputCommandInteraction) => {
  if (!interaction.inGuild()) {
    throw new Error('Guild not found for interaction')
  }
  return interaction.guild ?? interaction.client.guilds.fetch(interaction.guildId)
}
export const getInteractionMember = (interaction: ChatInputCommandInteraction, guild: Guild) => {
  const member = interaction.member
  if (!member) throw new Error(`Member not found for interaction`)
  return guild.members.fetch(member.user.id)
}

// option
export const getRequiredMember =
  (interaction: ChatInputCommandInteraction, guild: Guild) => async (name: string) => {
    const user = interaction.options.getUser(name)
    if (!user) throw new Error(`Invalid user option: ${name}`)
    const fetched = await guild.members.fetch(user.id)
    if (!fetched) throw new Error(`Invalid member option: ${name} (${user.id})`)
    return fetched
  }
export const getRequiredRole =
  (interaction: ChatInputCommandInteraction, guild: Guild) => async (name: string) => {
    const role = interaction.options.getRole(name)
    if (!role) throw new Error(`Invalid role option: ${name}`)
    const fetched = await guild.roles.fetch(role.id)
    if (!fetched) throw new Error(`Invalid role option: ${name} (${role.id})`)
    return fetched
  }
export const getOptionalMember =
  (interaction: ChatInputCommandInteraction, guild: Guild) => async (name: string) => {
    const user = interaction.options.getUser(name)
    if (!user) return null
    return guild.members.fetch(user.id)
  }
export const getOptionalRole =
  (interaction: ChatInputCommandInteraction, guild: Guild) => async (name: string) => {
    const role = interaction.options.getRole(name)
    if (!role) return null
    return guild.roles.fetch(role.id)
  }
