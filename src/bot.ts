import { DiscordHybridClient, events, listeners } from '@/lib/discord'
import { GatewayIntentBits } from 'discord.js'
import { ClusterClient, getInfo } from 'discord-hybrid-sharding'

const client = new DiscordHybridClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
    GatewayIntentBits.GuildMessagePolls,
    GatewayIntentBits.DirectMessagePolls,
  ],
  partials: [
    // Partials.User,
    // Partials.Channel,
    // Partials.GuildMember,
    // Partials.Message,
    // Partials.Reaction,
    // Partials.GuildScheduledEvent,
    // Partials.ThreadMember,
  ],
  shardCount: getInfo().TOTAL_SHARDS,
  shards: getInfo().SHARD_LIST,
})

for (const event of events) {
  client.on(event.event, (...args) => event.listener(...args).catch(() => {}))
}

client.once('ready', async (client) => {
  console.log(`ready: ${client.user.tag}, ${client.user.id}`)
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return
  if (!interaction.inCachedGuild()) return

  const listener = listeners[interaction.commandName]

  if (!listener) return

  await listener(interaction).catch(
    async (error: string) =>
      await interaction
        .reply({
          content: `🔸 ${error}`,
          ephemeral: true,
        })
        .catch(
          async () =>
            await interaction.editReply({
              content: `🔸 ${error}`,
            }),
        ),
  )
})

client.cluster = new ClusterClient(client)

client.login(process.env.DISCORD_TOKEN)
