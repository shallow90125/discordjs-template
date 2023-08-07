import { Client, GatewayIntentBits, Partials } from "discord.js";
import "dotenv/config";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
  partials: [Partials.Message]
});

client.on("ready", (client) => {
  console.log(`${client.token}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand())return;
})

client.login(process.env.TOKEN);
