import { commands, zEnv } from "@/utils";
import { REST, Routes } from "discord.js";

(async () => {
  const commandData = commands.map((command) => command.command.toJSON());

  console.log(`deploy global: start x${commandData.length}`);

  const rest = new REST().setToken(zEnv.TOKEN);

  try {
    await rest.put(Routes.applicationCommands(zEnv.CLIENT_ID), {
      body: commandData,
    });

    console.log(`deploy global: success x${commandData.length}`);
  } catch (error) {
    console.error(error);
  }
})();
