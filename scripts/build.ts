import { ResultAsync } from 'neverthrow'

import { commands } from '@/commands'

{
  const result = await Bun.build({
    entrypoints: ['src/index.ts'],
    outdir: 'dist',
    sourcemap: 'external',
    target: 'bun',
  })
  for (const log of result.logs) {
    console.log(log)
  }
  const status = result.success ? 'succeeded' : 'failed'
  console.log(`src/index.ts -> dist/index.js: ${status}`)
}

{
  const result = await Bun.build({
    entrypoints: ['src/bot.ts'],
    outdir: 'dist',
    sourcemap: 'external',
    target: 'bun',
  })
  for (const log of result.logs) {
    console.log(log)
  }
  const status = result.success ? 'succeeded' : 'failed'
  console.log(`src/bot.ts -> dist/bot.js: ${status}`)
}

{
  const result = await ResultAsync.fromPromise(
    Bun.file('dist/commands.json').write(
      JSON.stringify(
        commands.map((command) => command.command.toJSON()),
        null,
        2
      )
    ),
    (e) => e
  )
  result.match(
    () => console.log(`${commands.length} commands -> commands.json: succeeded`),
    (e) => {
      console.log(`${commands.length} commands -> commands.json: failed`)
      console.error(e)
    }
  )
}
