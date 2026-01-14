import {
  type RESTPostAPIApplicationCommandsResult,
  type RESTPostAPIChatInputApplicationCommandsJSONBody,
  RouteBases,
  Routes,
} from 'discord-api-types/v10'
import { ResultAsync } from 'neverthrow'

import { commands } from '@/commands'
import { ErrorMessage } from '@/types'

const deployGuildCommands =
  (token: string, clientId: string, guildId: string) =>
  (commands: RESTPostAPIChatInputApplicationCommandsJSONBody[]) => {
    return ResultAsync.fromPromise<RESTPostAPIApplicationCommandsResult, ErrorMessage>(
      fetch(RouteBases.api + Routes.applicationGuildCommands(clientId, guildId), {
        body: JSON.stringify(commands),
        headers: {
          Authorization: `Bot ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      }).then((res) => res.json() as Promise<RESTPostAPIApplicationCommandsResult>),
      (e) => ErrorMessage(e)
    )
  }

if (
  !process.env.DISCORD_DEV_TOKEN ||
  !process.env.DISCORD_DEV_CLIENT_ID ||
  !process.env.DISCORD_DEV_GUILD_ID
) {
  console.error('Missing environment variables for deploying guild commands.')
  process.exit(1)
}

const result = await deployGuildCommands(
  process.env.DISCORD_DEV_TOKEN,
  process.env.DISCORD_DEV_CLIENT_ID,
  process.env.DISCORD_DEV_GUILD_ID
)(commands.map((command) => command.command.toJSON()))

result.match(
  async (data) => {
    console.log(data)
    await Bun.file('src/commands/__snapshot__/dev.json').write(
      JSON.stringify(
        commands.map((command) => command.command.toJSON()),
        null,
        2
      )
    )
  },
  (e) => console.error(e)
)
