import type { ClusterClient } from 'discord-hybrid-sharding'

import { Client } from 'discord.js'

export class DiscordHybridClient<Ready extends boolean = boolean> extends Client<Ready> {
  cluster?: ClusterClient<DiscordHybridClient>
}
