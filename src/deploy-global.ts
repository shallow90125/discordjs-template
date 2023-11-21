import { getCommands, zEnv } from "@/utils";
import { REST, Routes } from "discord.js";

const commands = getCommands().map((command) => command.command.toJSON());

(async () => {
  console.log(`deploy global: start x${commands.length}`);

  const rest = new REST({ version: "10" }).setToken(zEnv.TOKEN);

  try {
    await rest.put(Routes.applicationCommands(zEnv.CLIENT_ID), {
      body: commands,
    });

    console.log(`deploy global: success x${commands.length}`);
  } catch (error) {
    console.error(error);
  }
})();
