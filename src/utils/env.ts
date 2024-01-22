import "dotenv/config";
import { z } from "zod";

const varSchema = z.string().min(1);

const envSchema = z.object({
  CLIENT_ID: varSchema,
  GUILD_ID: varSchema,
  TOKEN: varSchema,
});

export const zEnv = envSchema.parse(
  Object.assign(
    {},
    ...Object.keys(process.env).map((v) => ({ [v]: process.env[v] }))
  )
);
