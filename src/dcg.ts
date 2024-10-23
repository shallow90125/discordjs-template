import { commands } from '@/lib/discord'
import { REST, Routes } from 'discord.js'

const rest = new REST().setToken(process.env.DISCORD_TOKEN)

await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
  body: commands,
})

console.log(`deploy commands globally: x${commands.length}`)
