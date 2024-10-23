import { DiscordSubcommand } from '@/lib/discord'
import { ApplicationCommandOptionType } from 'discord.js'

export default new DiscordSubcommand({
  description: 'sudo role addall',
  listener: async (interaction) => {
    await interaction.deferReply()
    const member = interaction.options.getMember('member')

    if (!member) return interaction.editReply('🔸 Member not found')

    const roles = interaction.guild.roles.cache.filter((v) => v.editable)
    await member.roles.add(roles)

    return interaction.editReply(`🔹 All roles added to <@${member.id}>`)
  },
  name: 'addall',
  options: [
    {
      description: 'member',
      name: 'member',
      required: true,
      type: ApplicationCommandOptionType.User,
    },
  ],
})
