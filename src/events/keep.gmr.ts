import { DiscordEvent } from '@/lib/discord'
import { supabase } from '@/lib/supabase'

export default new DiscordEvent('guildMemberRemove', async (member) => {
  const roles = member.roles.cache.map((v) => v.id)

  await supabase.from('keep').upsert({
    created_at: 'now()',
    guild: member.guild.id,
    member: member.id,
    roles: roles,
  })
})
