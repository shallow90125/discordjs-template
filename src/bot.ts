import * as eventModules from "@/events";
import { DiscordEvent } from "@/interfaces";
import { getCommands } from "@/utils/get-commands";
import { Client, GatewayIntentBits, Partials } from "discord.js";
import "dotenv/config";
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

for (let i of Object.keys(eventModules) as (keyof typeof eventModules)[]) {
  const event: DiscordEvent<any> = eventModules[i];

  client.on(event.event, (...args) => event.listener(...args));
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.find(
    (command) => command.command.name == interaction.commandName,
  );

  if (!command) return;

  try {
    await command.proccess(interaction);
  } catch (error) {
    await interaction
      .reply({
        content: `${error}`,
        ephemeral: true,
      })
      .catch(() => {});
  }
});

client.login(process.env.TOKEN);
