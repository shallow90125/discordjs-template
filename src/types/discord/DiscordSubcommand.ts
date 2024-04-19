import {
  type APIApplicationCommandSubcommandOption,
  ApplicationCommandOptionType,
} from "discord.js";
import type { SomeRequired } from ".";
import type { DiscordCommandListener } from "./DiscordCommandListener";

export class DiscordSubcommand {
  readonly option: SomeRequired<
    APIApplicationCommandSubcommandOption,
    "options"
  >;
  readonly listener: DiscordCommandListener;
  constructor({
    ...option
  }: Omit<APIApplicationCommandSubcommandOption, "type"> & {
    listener: DiscordCommandListener;
  }) {
    this.option = {
      type: ApplicationCommandOptionType.Subcommand,
      options: [],
      ...option,
    };
    this.listener = option.listener;
  }
}
