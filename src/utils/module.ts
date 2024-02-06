import * as commandModules from "@/commands";
import * as eventModules from "@/events";
import { DiscordCommand, DiscordEvent } from "@/types";

export const commands = (
  Object.keys(commandModules) as (keyof typeof commandModules)[]
).map((key) => commandModules[key] as DiscordCommand);

export const events = (
  Object.keys(eventModules) as (keyof typeof eventModules)[]
).map((key) => eventModules[key] as DiscordEvent);
