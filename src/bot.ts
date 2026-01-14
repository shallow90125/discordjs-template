import { Client, Events, GatewayIntentBits } from 'discord.js'

import { chatInputCommandInteractionHandler } from '@/commands'
import { events } from '@/events'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    // GatewayIntentBits.GuildModeration,
    // GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    // GatewayIntentBits.GuildWebhooks,
    // GatewayIntentBits.GuildInvites,
    // GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    // GatewayIntentBits.GuildMessageReactions,
    // GatewayIntentBits.GuildMessageTyping,
    // GatewayIntentBits.DirectMessages,
    // GatewayIntentBits.DirectMessageReactions,
    // GatewayIntentBits.DirectMessageTyping,
    // GatewayIntentBits.MessageContent,
    // GatewayIntentBits.GuildScheduledEvents,
    // GatewayIntentBits.AutoModerationConfiguration,
    // GatewayIntentBits.AutoModerationExecution,
    // GatewayIntentBits.GuildMessagePolls,
    // GatewayIntentBits.DirectMessagePolls,
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
})

client.once(Events.ClientReady, async (client) => {
  console.log(`ready: ${client.user.tag}, ${client.user.id}`)
})

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) {
    await chatInputCommandInteractionHandler(interaction)
  }
})

for (const event of events) {
  client.on(event.name, event.handler<typeof event.name>)
}

client.on(Events.Error, async (error) => {
  console.error(error)
})

client.login(process.env.DISCORD_TOKEN)
