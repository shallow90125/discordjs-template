import { DiscordSubcommand } from '@/lib/discord'
import { ApplicationCommandOptionType, PermissionsBitField } from 'discord.js'

export default new DiscordSubcommand({
  description: 'role delete',
  listener: async (interaction) => {
    await interaction.deferReply()
    const role = interaction.options.getRole('role', true)
    const guild = interaction.guild

    if (!guild.members.me?.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      return interaction.editReply('🔸 Requires "Manage Roles" permission')
    }

    if (!role.editable) {
      return interaction.editReply(`🔸 <@&${role.id}> is higher than my roles`)
    }

    if (role.permissions.bitfield != 0n) {
      return interaction.editReply(`🔸 <@&${role.id}> has permissions`)
    }

    if (!guild.members.cache.every((member) => !member.roles.cache.has(role.id))) {
      return interaction.editReply(`🔸 Someone has <@&${role.id}>`)
    }

    await guild.roles.delete(role)

    return interaction.editReply(`🔹 @${role.name} deleted`)
  },
  name: 'delete',
  options: [
    {
      description: 'role',
      name: 'role',
      required: true,
      type: ApplicationCommandOptionType.Role,
    },
  ],
})
