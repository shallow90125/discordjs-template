import { defineEvent } from '@/features/event'

export default defineEvent('messageCreate', async (message) => {
  if (message.author.bot) {
    return
  }
  await message.reply(`You said: ${message.content}`)
})
