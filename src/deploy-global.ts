import {
  REST,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
} from "discord.js";
import "dotenv/config";
import * as commandModules from "./commands/index.js";
import { DiscordCommand } from "./interfaces/DiscordCommand";

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

for (let i of Object.keys(commandModules) as (keyof typeof commandModules)[]) {
  const command: DiscordCommand = commandModules[i];
  commands.push(command.command.toJSON());
}

(async () => {
  if (!process.env.TOKEN || !process.env.CLIENT_ID) return;

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
