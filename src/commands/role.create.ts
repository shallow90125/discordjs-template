import { DiscordSubcommand } from '@/lib/discord'
import { ApplicationCommandOptionType, PermissionsBitField } from 'discord.js'

export default new DiscordSubcommand({
  description: 'role create',
  listener: async (interaction) => {
    await interaction.deferReply()
    const name = interaction.options.getString('name', true)
    const member = interaction.options.getMember('user')
    const guild = interaction.guild

    if (!guild.members.me?.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      return interaction.editReply('🔸 Requires "Manage Roles" permission')
    }

    const names = guild.roles.cache.filter((role) => role.name === name)

    if (names.size) {
      return interaction.editReply(`🔸 <@&${names.at(0)?.id}> already exists`)
    }

    const newRole = await guild.roles.create({
      mentionable: true,
      name: name,
      permissions: '0',
    })

    if (!member) {
      return interaction.editReply(`🔹 <@&${newRole.id}> created`)
    }

    await member.roles.add(newRole)
    return interaction.editReply(`🔹 <@&${newRole.id}> created & added to <@${member.id}>`)
  },
  name: 'create',
  options: [
    {
      description: 'name',
      name: 'name',
      required: true,
      type: ApplicationCommandOptionType.String,
    },
    {
      description: 'user',
      name: 'user',
      type: ApplicationCommandOptionType.User,
    },
  ],
})
