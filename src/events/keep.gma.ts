import { DiscordEvent } from '@/lib/discord'
import { supabase } from '@/lib/supabase'

export default new DiscordEvent('guildMemberAdd', async (member) => {
  const { data: sd, error: se } = await supabase
    .from('sync')
    .select()
    .limit(1)
    .eq('guild', member.guild.id)
    .eq('syncing', false)
    .contains('members', [member.id])

  if (!se && sd.length) {
    const members = await member.guild.members.fetch({
      limit: 1,
      user: sd[0].members,
    })

    const preMember = members.at(0)

    if (preMember) {
      await member.roles.add(preMember.roles.cache)
      return
    }
  }

  const { data, error } = await supabase
    .from('keep')
    .select()
    .limit(1)
    .eq('guild', member.guild.id)
    .eq('member', member.id)

  if (error || !data.length) return

  const prevRoles = data[0].roles

  const roles = member.guild.roles.cache.filter((v) => prevRoles.includes(v.id)).filter((v) => v.editable)

  await member.roles.add(roles)
})
