import { events, commands, zEnv } from "@/utils";
import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
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
});

for (const event of events) {
  client.on(event.event, (...args) => event.listener(...args).catch(() => {}));
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!interaction.inCachedGuild()) return;

  const command = commands.find(
    (command) => command.command.name === interaction.commandName
  );

  if (!command) return;

  await command.listener(interaction).catch(
    async (error) =>
      await interaction
        .reply({
          content: `${error}`,
          ephemeral: true,
        })
        .catch(() => {})
  );
});

client.login(zEnv.TOKEN);
