import { type APIApplicationCommandSubcommandOption, ApplicationCommandOptionType } from 'discord.js'

import type { DiscordCommandListener } from './DiscordCommandListener'
import type { SomeRequired } from './SomeRequired'

export class DiscordSubcommand {
  readonly listener: DiscordCommandListener
  readonly option: SomeRequired<APIApplicationCommandSubcommandOption, 'options'>
  constructor({
    ...option
  }: {
    listener: DiscordCommandListener
  } & Omit<APIApplicationCommandSubcommandOption, 'type'>) {
    this.option = {
      options: [],
      type: ApplicationCommandOptionType.Subcommand,
      ...option,
    }
    this.listener = option.listener
  }
}
