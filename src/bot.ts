import * as events from "@/events";
import { getCommands, zEnv } from "@/utils";
import { Client, GatewayIntentBits, Partials } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Message],
});

const commands = getCommands();

(Object.keys(events) as (keyof typeof events)[]).map((key) =>
  client.on(events[key].event, (...args) =>
    events[key].listener(...args).catch(() => {}),
  ),
);

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.find(
    (command) => command.command.name === interaction.commandName,
  );

  if (!command) return;

  await command.listener(interaction).catch(
    async (error) =>
      await interaction
        .reply({
          content: `${error}`,
          ephemeral: true,
        })
        .catch(() => {}),
  );
});

client.login(zEnv.TOKEN);
