import { DiscordSubcommand } from '@/lib/discord'
import { ApplicationCommandOptionType } from 'discord.js'

export default new DiscordSubcommand({
  description: 'sudo role copy',
  listener: async (interaction) => {
    await interaction.deferReply()
    const source = interaction.options.getMember('source')
    const target = interaction.options.getMember('target')
    if (!source || !target) return interaction.editReply('🔹 Member not found')

    const sourceRoles = source.roles.cache.filter((v) => v.editable)
    const targetRoles = target.roles.cache.filter((v) => v.editable)
    const diff = sourceRoles.difference(targetRoles)
    if (!diff.size) return interaction.editReply(`🔹 Copied roles from <@${source.id}> to <@${target.id}>`)

    await target.roles.remove(targetRoles)
    await target.roles.add(sourceRoles)

    return interaction.editReply(`🔹 Copied roles from <@${source.id}> to <@${target.id}>`)
  },
  name: 'copy',
  options: [
    {
      description: 'source',
      name: 'source',
      required: true,
      type: ApplicationCommandOptionType.User,
    },
    {
      description: 'target',
      name: 'target',
      required: true,
      type: ApplicationCommandOptionType.User,
    },
  ],
})
