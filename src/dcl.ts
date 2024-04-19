import { REST, Routes } from "discord.js";
import { commands } from "utils/discord";
import { zEnv } from "utils/env";

const rest = new REST().setToken(zEnv.DISCORD_TOKEN);

await rest.put(
  Routes.applicationGuildCommands(
    zEnv.DISCORD_CLIENT_ID,
    zEnv.DISCORD_GUILD_ID,
  ),
  {
    body: commands,
  },
);

console.log(`deploy commands locally: x${commands.length}`);
