import { DiscordCommand } from '@/lib/discord'

export default new DiscordCommand({
  default_member_permissions: '0',
  description: 'sudo',
  dm_permission: false,
  name: 'sudo',
})
