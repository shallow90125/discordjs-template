import type { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import type { SomeRequired } from ".";
import type { DiscordCommandListener } from "./DiscordCommandListener";

export class DiscordCommand {
  readonly option: SomeRequired<
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    "options"
  >;
  readonly listener?: DiscordCommandListener;

  constructor({
    ...option
  }: RESTPostAPIChatInputApplicationCommandsJSONBody & {
    listener?: DiscordCommandListener;
  }) {
    this.option = { options: [], ...option };
    this.listener = option.listener;
  }
}
