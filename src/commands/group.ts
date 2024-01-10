import { DiscordSubcommandGroup } from "@/types";
import { subcommand } from "./subcommand";

export const group = new DiscordSubcommandGroup({
  command: (command) => command.setName("group").setDescription("group"),
  subcommands: [subcommand],
});
