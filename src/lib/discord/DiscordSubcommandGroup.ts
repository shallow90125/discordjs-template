import { type APIApplicationCommandSubcommandGroupOption, ApplicationCommandOptionType } from 'discord.js'

import type { SomeRequired } from './SomeRequired'

export class DiscordSubcommandGroup {
  readonly option: SomeRequired<APIApplicationCommandSubcommandGroupOption, 'options'>
  constructor({ ...option }: Omit<APIApplicationCommandSubcommandGroupOption, 'type'>) {
    this.option = {
      options: [],
      type: ApplicationCommandOptionType.SubcommandGroup,
      ...option,
    }
  }
}
