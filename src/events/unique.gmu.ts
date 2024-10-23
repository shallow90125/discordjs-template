import { DiscordEvent } from '@/lib/discord'
import { supabase } from '@/lib/supabase'

export default new DiscordEvent('guildMemberUpdate', async (oldMember, newMember) => {
  // ロールが追加されたか
  if (newMember.roles.cache.size <= oldMember.roles.cache.size) return

  // 固有ロールかどうか
  const diff = newMember.roles.cache.difference(oldMember.roles.cache)
  const { data, error } = await supabase
    .from('unique')
    .select('roles')
    .limit(1)
    .eq('guild', newMember.guild.id)
    .contains(
      'roles',
      diff.map((v) => v.id),
    )
  if (error || !data.length) return

  // 編集可能なロールがあるかどうか
  const roles = data[0].roles
  const removeRoles = oldMember.roles.cache.filter((v) => roles.includes(v.id) && v.editable)
  if (!removeRoles.size) return

  // 固有ロールの重複を削除
  await newMember.roles.remove(removeRoles)
})
