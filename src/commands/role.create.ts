import {
  type ChatInputCommandInteraction,
  PermissionsBitField,
  SlashCommandSubcommandBuilder,
} from 'discord.js'

import { getInteractionGuild, getOptionalMember } from '@/features/command'

export const subcommand = new SlashCommandSubcommandBuilder()
  .setName('create')
  .setDescription('role create')
  .addStringOption((v) => v.setName('name').setDescription('name').setRequired(true))
  .addUserOption((v) => v.setName('user').setDescription('user'))

export const handler = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply()
  const guild = await getInteractionGuild(interaction)
  const name = interaction.options.getString('name', true)
  const member = await getOptionalMember(interaction, guild)('user')

  if (!guild.members.me?.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
    return interaction.editReply('🔸 Requires "Manage Roles" permission')
  }

  const names = guild.roles.cache.filter((role) => role.name === name)
  if (names.size) {
    return interaction.editReply(`🔸 <@&${names.at(0)?.id}> already exists`)
  }

  const newRole = await guild.roles
    .create({
      mentionable: true,
      name: name,
      permissions: '0',
    })
    .catch(async (err) => {
      await interaction.editReply(`🔸 Failed to create role: ${err.message}`)
    })
  if (!newRole) return

  if (!member) {
    return interaction.editReply(`🔹 <@&${newRole.id}> created`)
  }

  await member.roles.add(newRole)
  return interaction.editReply(`🔹 <@&${newRole.id}> created & added to <@${member.id}>`)
}
