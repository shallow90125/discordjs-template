import { DiscordEvent } from '@/lib/discord'
import { supabase } from '@/lib/supabase'

export default new DiscordEvent('guildMemberUpdate', async (oldMember, newMember) => {
  // ロール差分があるか
  const oldSize = oldMember.roles.cache.size
  const newSize = newMember.roles.cache.size
  if (newSize === oldSize) return

  // ロールが編集可能か
  const oldRoles = oldMember.roles.cache.filter((v) => v.editable)
  const newRoles = newMember.roles.cache.filter((v) => v.editable)
  const diff = oldRoles.difference(newRoles)
  if (!diff.size) return

  // 同期対象か
  const guild = newMember.guild
  const { data, error } = await supabase
    .from('sync')
    .select('members')
    .limit(1)
    .eq('syncing', false)
    .eq('guild', guild.id)
    .contains('members', [newMember.id])
  if (error || !data.length) return

  const members = data[0].members

  // 同期開始
  await supabase.from('sync').update({ syncing: true }).eq('guild', guild.id).contains('members', [newMember.id])

  // 同期処理
  for (const id of members) {
    if (id === newMember.id) continue

    const member = await guild.members.fetch(id).catch(() => undefined)
    if (!member) continue

    const memberRoles = member.roles.cache.filter((v) => v.editable)
    const oldDiff = memberRoles.difference(oldRoles)
    const newDiff = memberRoles.difference(newRoles)

    if (!newDiff.size) continue

    if (oldDiff.size) {
      await member.roles.remove(memberRoles)
      await member.roles.add(newRoles)
      continue
    }

    if (oldRoles.size < newRoles.size) {
      await member.roles.add(diff)
    } else {
      await member.roles.remove(diff)
    }
  }

  // 同期終了
  await supabase.from('sync').update({ syncing: false }).eq('guild', guild.id).contains('members', [newMember.id])
})
