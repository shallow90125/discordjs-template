import { DiscordCommand } from "types";
import { group } from "./group";
import { subcommand } from "./subcommand";

export default new DiscordCommand({
  command: (command) => command.setName("command").setDescription("command"),
  options: {
    subcommandGroups: [group],
    subcommands: [subcommand],
  },
});
