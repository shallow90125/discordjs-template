import { ClusterClient, getInfo } from "discord-hybrid-sharding";
import { GatewayIntentBits } from "discord.js";
import { DiscordHybridClient } from "types/discord";
import { events, listeners } from "utils/discord";
import { zEnv } from "utils/env";

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
  ],
  partials: [
    // Partials.Message,
    // Partials.Channel,
    // Partials.Reaction,
  ],
  shards: getInfo().SHARD_LIST,
  shardCount: getInfo().TOTAL_SHARDS,
});

for (const event of events) {
  client.on(event.event, (...args) => event.listener(...args).catch(() => {}));
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!interaction.inCachedGuild()) return;

  const listener = listeners[interaction.commandName];

  if (!listener) return;

  await listener(interaction).catch(
    async (error) =>
      await interaction
        .reply({
          content: `${error}`,
          ephemeral: true,
        })
        .catch(() => {}),
  );
});

client.cluster = new ClusterClient(client);

client.login(zEnv.DISCORD_TOKEN);
