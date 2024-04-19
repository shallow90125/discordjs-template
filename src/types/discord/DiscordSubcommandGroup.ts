import {
  type APIApplicationCommandSubcommandGroupOption,
  ApplicationCommandOptionType,
} from "discord.js";
import type { SomeRequired } from ".";

export class DiscordSubcommandGroup {
  readonly option: SomeRequired<
    APIApplicationCommandSubcommandGroupOption,
    "options"
  >;
  constructor({
    ...option
  }: Omit<APIApplicationCommandSubcommandGroupOption, "type">) {
    this.option = {
      type: ApplicationCommandOptionType.SubcommandGroup,
      options: [],
      ...option,
    };
  }
}
