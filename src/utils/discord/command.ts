import { Glob } from "bun";
import type { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import {
  DiscordCommand,
  DiscordSubcommand,
  DiscordSubcommandGroup,
} from "types/discord";
import type { DiscordCommandListener } from "types/discord/DiscordCommandListener";

const subListener: DiscordCommandListener = async (interaction) => {
  await interaction.deferReply();

  const c = interaction.commandName;
  const g = interaction.options.getSubcommandGroup();
  const s = interaction.options.getSubcommand();

  const listener = g ? listeners[`${c}.${g}.${s}`] : listeners[`${c}.${s}`];

  if (!listener) return interaction.editReply("notfound");

  return listener(interaction);
};

export const listeners: Record<string, DiscordCommandListener | undefined> = {};

const gsr: Record<string, DiscordSubcommand> = {};
const gr: Record<string, DiscordSubcommandGroup> = {};
const sr: Record<string, DiscordSubcommand> = {};
const cr: Record<string, DiscordCommand> = {};

const glob = new Glob("commands/**/*.ts");
for await (const path of glob.scan("src")) {
  const file = (await import(path)).default;
  const name = path.replace(/^.+\//, "").replace(/\.ts$/, "");
  const v = name.split(".");

  switch (v.length) {
    case 1:
      if (file instanceof DiscordCommand) {
        cr[name] = file;
      }
      break;

    case 2:
      if (file instanceof DiscordSubcommand) {
        sr[name] = file;
      } else if (file instanceof DiscordSubcommandGroup) {
        gr[name] = file;
      }
      break;

    case 3:
      if (file instanceof DiscordSubcommand) {
        gsr[name] = file;
      }
      break;
  }
}

for (const k in gsr) {
  const [c, g, s] = k.split(".");
  const n = gsr[k].option.name;

  if (s !== n) {
    throw new Error(
      `Command name (${n}) different from file name (${s}) (${k})`,
    );
  }

  if (sr[`${c}.${g}`]) {
    throw new Error(
      `DiscordSubcommand (${c}.${g}) must export DiscordSubcommandGroup`,
    );
  }

  if (!gr[`${c}.${g}`]) {
    throw new Error(`DiscordSubcommand not found (${c}.${g})`);
  }

  gr[`${c}.${g}`].option.options.push(gsr[k].option);
  listeners[k] = gsr[k].listener;
}

for (const k in gr) {
  const [c, g] = k.split(".");
  const n = gr[k].option.name;

  if (g !== n) {
    throw new Error(
      `Command name (${n}) different from file name (${g}) (${k})`,
    );
  }

  if (!cr[c]) {
    throw new Error(`DiscordCommand not found (${c})`);
  }

  if (cr[c].option.options) {
    cr[c].option.options.push(gr[k].option);
  } else {
    cr[c].option.options = [gr[k].option];
  }
}

for (const k in sr) {
  const [c, s] = k.split(".");
  const n = sr[k].option.name;

  if (s !== n) {
    throw new Error(
      `Command name (${n}) different from file name (${s}) (${k})`,
    );
  }

  if (!cr[c]) {
    throw new Error(`DiscordCommand not found (${c})`);
  }

  if (cr[c].option.options) {
    cr[c].option.options.push(sr[k].option);
  } else {
    cr[c].option.options = [sr[k].option];
  }
  listeners[k] = sr[k].listener;
}

for (const k in cr) {
  const n = cr[k].option.name;

  if (k !== n) {
    throw new Error(`Command name (${n}) different from file name (${k})`);
  }

  listeners[k] = cr[k].listener ? cr[k].listener : subListener;
}

export const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] =
  Object.values(cr).map((v) => v.option);
