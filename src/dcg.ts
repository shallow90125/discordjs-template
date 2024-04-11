import { REST, Routes } from "discord.js";
import { commands, zEnv } from "utils";

const commandData = commands.map((command) => command.command.toJSON());

const rest = new REST().setToken(zEnv.DISCORD_TOKEN);

await rest.put(Routes.applicationCommands(zEnv.DISCORD_CLIENT_ID), {
  body: commandData,
});

console.log(`deploy commands globally: x${commandData.length}`);
