import { REST, Routes } from "discord.js";
import { commands } from "utils/discord";
import { zEnv } from "utils/env";

const rest = new REST().setToken(zEnv.DISCORD_TOKEN);

await rest.put(Routes.applicationCommands(zEnv.DISCORD_CLIENT_ID), {
  body: commands,
});

console.log(`deploy commands globally: x${commands.length}`);
