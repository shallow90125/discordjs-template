import { ClusterManager } from 'discord-hybrid-sharding'

const manager = new ClusterManager('src/bot.ts', {
  shardsPerClusters: 2,
  token: process.env.DISCORD_TOKEN,
  totalShards: 'auto',
})

manager.spawn({ timeout: -1 })
