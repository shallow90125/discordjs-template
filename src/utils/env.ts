import { z } from "zod";

const varSchema = z.string().min(1);

const envSchema = z.object({
  DISCORD_CLIENT_ID: varSchema,
  DISCORD_GUILD_ID: varSchema,
  DISCORD_TOKEN: varSchema,
});

export const zEnv = envSchema.parse(process.env);
