import { getCommands } from "@/utils";
import { REST, Routes } from "discord.js";
import "dotenv/config";

const commands = getCommands().map((command) => command.command.toJSON());

(async () => {
  if (!process.env.TOKEN || !process.env.CLIENT_ID) {
    console.log(`token: ${process.env.TOKEN}`);
    console.log(`clientId: ${process.env.CLIENT_ID}`);
    return;
  }

  console.log(`deploy global: start x${commands.length}`);

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

  try {
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });

    console.log(`deploy global: success x${commands.length}`);
  } catch (error) {
    console.error(error);
  }
})();
