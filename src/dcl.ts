import { commands } from '@/lib/discord'
import { REST, Routes } from 'discord.js'

const rest = new REST().setToken(process.env.DISCORD_TOKEN)

await rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID), {
  body: commands,
})

console.log(`deploy commands locally: x${commands.length}`)
