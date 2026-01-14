import {
  type ChatInputCommandInteraction,
  PermissionsBitField,
  SlashCommandSubcommandBuilder,
} from 'discord.js'

import { getInteractionGuild, getRequiredMember, getRequiredRole } from '@/features/command'

export const subcommand = new SlashCommandSubcommandBuilder()
  .setName('add')
  .setDescription('role add')
  .addRoleOption((v) => v.setName('role').setDescription('role').setRequired(true))
  .addUserOption((v) => v.setName('user').setDescription('user').setRequired(true))

export const handler = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply()
  const guild = await getInteractionGuild(interaction)
  const role = await getRequiredRole(interaction, guild)('role')
  const member = await getRequiredMember(interaction, guild)('user')

  if (!guild.members.me?.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
    return interaction.editReply('🔸 Requires "Manage Roles" permission')
  }

  if (!role.editable) {
    return interaction.editReply(`🔸 <@&${role.id}> is higher than my roles`)
  }

  if (role.permissions.bitfield != 0n) {
    return interaction.editReply(`🔸 <@&${role.id}> has permissions`)
  }

  if (member.roles.cache.has(role.id)) {
    return interaction.editReply(`🔸 <@${member.id}> already has <@&${role.id}>`)
  }

  await member.roles.add(role)
  return interaction.editReply(`🔹 <@&${role.id}> added to <@${member.id}>`)
}
