import {
  type ChatInputCommandInteraction,
  PermissionsBitField,
  SlashCommandSubcommandBuilder,
} from 'discord.js'

import { getInteractionGuild, getInteractionMember, getRequiredRole } from '@/features/command'

export const subcommand = new SlashCommandSubcommandBuilder()
  .setName('remove')
  .setDescription('role remove')
  .addRoleOption((v) => v.setName('role').setDescription('role').setRequired(true))

export const handler = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply()
  const guild = await getInteractionGuild(interaction)
  const member = await getInteractionMember(interaction, guild)
  const role = await getRequiredRole(interaction, guild)('role')

  if (!guild.members.me?.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
    return interaction.editReply('🔸 Requires "Manage Roles" permission')
  }

  if (!role.editable) {
    return interaction.editReply(`🔸 <@&${role.id}> is higher than my roles`)
  }

  if (role.permissions.bitfield != 0n) {
    return interaction.editReply(`🔸 <@&${role.id}> has permissions`)
  }

  if (!member.roles.cache.has(role.id)) {
    return interaction.editReply(`🔸 You don't aleady have <@&${role.id}>`)
  }

  await member.roles.remove(role)
  return interaction.editReply(`🔹 <@&${role.id}> removed from <@${member.id}>`)
}
