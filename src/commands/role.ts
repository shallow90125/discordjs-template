import { InteractionContextType, SlashCommandBuilder } from 'discord.js'

import { createSubcommandRouter } from '@/features/command'

import * as roleAdd from './role.add'
import * as roleCreate from './role.create'
import * as roleDelete from './role.delete'
import * as roleRemove from './role.remove'

export const command = new SlashCommandBuilder()
  .setName('role')
  .setDescription('role')
  .setContexts(InteractionContextType.Guild)
  .addSubcommand(roleAdd.subcommand)
  .addSubcommand(roleCreate.subcommand)
  .addSubcommand(roleDelete.subcommand)
  .addSubcommand(roleRemove.subcommand)

export const handler = createSubcommandRouter(roleAdd, roleCreate, roleDelete, roleRemove)
