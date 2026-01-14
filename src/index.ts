import { ShardingManager } from 'discord.js'

const manager = new ShardingManager(
  import.meta.file.endsWith('.ts') ? 'src/bot.ts' : 'dist/bot.js',
  {
    token: process.env.DISCORD_TOKEN,
  }
)

manager.spawn()
