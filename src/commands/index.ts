import type { ChatInputCommandInteraction } from 'discord.js'

import { createCommandRouter, onInteractionFailed } from '@/features/command'

import * as role from './role'

export const commands = [role] as const
const handler = createCommandRouter(...commands)

export const chatInputCommandInteractionHandler = (interaction: ChatInputCommandInteraction) =>
  handler(interaction).orElse(onInteractionFailed(interaction))
