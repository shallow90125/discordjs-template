import { DiscordSubcommand } from '@/lib/discord'
import { ApplicationCommandOptionType, PermissionsBitField } from 'discord.js'

export default new DiscordSubcommand({
  description: 'role remove',
  listener: async (interaction) => {
    await interaction.deferReply()
    const role = interaction.options.getRole('role', true)

    if (!interaction.guild.members.me?.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      return interaction.editReply('🔸 Requires "Manage Roles" permission')
    }

    if (!role.editable) {
      return interaction.editReply(`🔸 <@&${role.id}> is higher than my roles`)
    }

    if (role.permissions.bitfield != 0n) {
      return interaction.editReply(`🔸 <@&${role.id}> has permissions`)
    }

    if (!interaction.member.roles.cache.has(role.id)) {
      return interaction.editReply(`🔸 You don't aleady have <@&${role.id}>`)
    }

    await interaction.member.roles.remove(role)

    return interaction.editReply(`🔹 <@&${role.id}> removed from <@${interaction.member.id}>`)
  },
  name: 'remove',
  options: [
    {
      description: 'role',
      name: 'role',
      required: true,
      type: ApplicationCommandOptionType.Role,
    },
  ],
})
