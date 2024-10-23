import { z } from 'zod'

const zVar = z.string().min(1)
const zEnv = z.object({
  DISCORD_CLIENT_ID: zVar,
  DISCORD_GUILD_ID: zVar,
  DISCORD_TOKEN: zVar,
  SUPABASE_ANON_KEY: zVar,
  SUPABASE_ID: zVar,
  SUPABASE_URL: zVar,
})

const result = zEnv.safeParse(process.env)

if (!result.success) {
  throw `env type is invalid \n${result.error.errors
    .map((error) => `${error.message}: env.${error.path[0]}`)
    .join('\n')}`
}

/* eslint @typescript-eslint/no-empty-object-type: off */
declare module 'bun' {
  interface Env extends z.infer<typeof zEnv> {}
}
