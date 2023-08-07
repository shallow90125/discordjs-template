import { Client, GatewayIntentBits, Partials } from "discord.js";
import "dotenv/config";
import * as commandModules from "./commands/index.js";
import * as eventModules from "./events/index.js";
import { DiscordCommand } from "./interfaces/DiscordCommand.js";
import { DiscordEvent } from "./interfaces/DiscordEvent";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
  partials: [Partials.Message],
});

client.on("ready", (client) => {
  console.log(`${client.token}`);
});

const commands: DiscordCommand[] = [];

for (let i of Object.keys(commandModules) as (keyof typeof commandModules)[]) {
  const command: DiscordCommand = commandModules[i];
  commands.push(command);
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

for (let i of Object.keys(eventModules) as (keyof typeof eventModules)[]) {
  const event: DiscordEvent<any> = eventModules[i];

  client.on(event.event, (...args) => event.listener(...args));
}

client.login(process.env.TOKEN);
