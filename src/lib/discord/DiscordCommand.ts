import type { RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js'

import type { DiscordCommandListener } from './DiscordCommandListener'
import type { SomeRequired } from './SomeRequired'

export class DiscordCommand {
  readonly listener?: DiscordCommandListener
  readonly option: SomeRequired<RESTPostAPIChatInputApplicationCommandsJSONBody, 'options'>

  constructor({
    ...option
  }: {
    listener?: DiscordCommandListener
  } & RESTPostAPIChatInputApplicationCommandsJSONBody) {
    this.option = { options: [], ...option }
    this.listener = option.listener
  }
}
