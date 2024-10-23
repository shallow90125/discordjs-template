import { DiscordSubcommand } from '@/lib/discord'
import { ApplicationCommandOptionType, PermissionsBitField } from 'discord.js'

export default new DiscordSubcommand({
  description: 'role add',
  listener: async (interaction) => {
    await interaction.deferReply()
    const role = interaction.options.getRole('role', true)
    const member = interaction.options.getMember('user')

    if (!member) {
      return interaction.editReply('🔸 Member not found')
    }

    if (!interaction.guild.members.me?.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
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
  },
  name: 'add',
  options: [
    {
      description: 'role',
      name: 'role',
      required: true,
      type: ApplicationCommandOptionType.Role,
    },
    {
      description: 'user',
      name: 'user',
      required: true,
      type: ApplicationCommandOptionType.User,
    },
  ],
})
