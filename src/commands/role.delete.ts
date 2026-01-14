import {
  type ChatInputCommandInteraction,
  PermissionsBitField,
  SlashCommandSubcommandBuilder,
} from 'discord.js'

import { getInteractionGuild, getRequiredRole } from '@/features/command'

export const subcommand = new SlashCommandSubcommandBuilder()
  .setName('delete')
  .setDescription('role delete')
  .addRoleOption((v) => v.setName('role').setDescription('role').setRequired(true))

export const handler = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply()
  const guild = await getInteractionGuild(interaction)
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

  const users = guild.members.cache.filter((v) => v.roles.cache.has(role.id))

  if (users.has(interaction.user.id)) {
    return interaction.editReply(`🔸 \`/remove\` before delete <@&${role.id}>`)
  }

  if (users.size) {
    return interaction.editReply(`🔸 Someone has <@&${role.id}>`)
  }

  await guild.roles.delete(role)

  return interaction.editReply(`🔹 @${role.name} deleted`)
}
