import {
  type RESTPostAPIApplicationCommandsResult,
  type RESTPostAPIChatInputApplicationCommandsJSONBody,
  RouteBases,
  Routes,
} from 'discord-api-types/v10'
import { ResultAsync } from 'neverthrow'

import { ErrorMessage } from '@/types'

const deployGlobalCommands =
  (token: string, clientId: string) =>
  (commands: RESTPostAPIChatInputApplicationCommandsJSONBody[]) => {
    return ResultAsync.fromPromise<RESTPostAPIApplicationCommandsResult, ErrorMessage>(
      fetch(RouteBases.api + Routes.applicationCommands(clientId), {
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

if (!process.env.DISCORD_PROD_TOKEN || !process.env.DISCORD_PROD_CLIENT_ID) {
  console.error('Missing environment variables for deploying global commands.')
  process.exit(1)
}

const commands = await Bun.file('dist/commands.json').json()
const result = await deployGlobalCommands(
  process.env.DISCORD_PROD_TOKEN,
  process.env.DISCORD_PROD_CLIENT_ID
)(commands)

result.match(
  (data) => console.log(data),
  (e) => console.error(e)
)
