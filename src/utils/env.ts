import { z } from "zod";

const varSchema = z.string().min(1);

const envSchema = z.object({
  CLIENT_ID: varSchema,
  GUILD_ID: varSchema,
  TOKEN: varSchema,
});

export const zEnv = envSchema.parse(process.env);
