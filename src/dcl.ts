import { REST, Routes } from "discord.js";
import { commands, zEnv } from "utils";

const commandData = commands.map((command) => command.command.toJSON());

const rest = new REST().setToken(zEnv.DISCORD_TOKEN);

await rest.put(
  Routes.applicationGuildCommands(
    zEnv.DISCORD_CLIENT_ID,
    zEnv.DISCORD_GUILD_ID,
  ),
  {
    body: commandData,
  },
);

console.log(`deploy commands locally: x${commandData.length}`);
