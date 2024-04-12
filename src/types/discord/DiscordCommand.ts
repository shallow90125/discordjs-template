import {
  SlashCommandBuilder,
  type SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";
import type { DiscordCommandListener as Listener } from "./DiscordCommandListener";
import type { DiscordSubcommand } from "./DiscordSubcommand";
import type { DiscordSubcommandGroup } from "./DiscordSubcommandGroup";

type PartialRequire<O, K extends keyof O> = {
  [P in K]-?: O[P];
} & O;

type RequireOne<T, K extends keyof T = keyof T> = K extends keyof T
  ? PartialRequire<T, K>
  : never;

type SubcommandOptions = RequireOne<{
  subcommands?: [DiscordSubcommand, ...DiscordSubcommand[]];
  subcommandGroups?: [DiscordSubcommandGroup, ...DiscordSubcommandGroup[]];
}>;

export class DiscordCommand<
  T extends Listener | SubcommandOptions = Listener | SubcommandOptions,
> {
  readonly command: T extends Listener
    ? SlashCommandBuilder
    : SlashCommandSubcommandsOnlyBuilder;
  readonly listener: Listener;
  private readonly subcommandGroups: DiscordSubcommandGroup[];
  private readonly subcommands: DiscordSubcommand[];

  private subcommandListener: Listener = async (interaction) => {
    const subcommandName = interaction.options.getSubcommand();
    const subcommandGroupName = interaction.options.getSubcommandGroup();

    const s = this.subcommands.find((v) => v.command.name === subcommandName);

    const g = this.subcommandGroups.find(
      (v) => v.command.name === subcommandGroupName,
    );

    if (!g) {
      if (!s) return;

      s.listener(interaction);
      return;
    }

    const gs = g.subcommands.find((v) => v.command.name === subcommandName);

    if (!gs) return;

    gs.listener(interaction);
  };

  constructor({
    command,
    options,
  }: {
    command: (command: SlashCommandBuilder) => SlashCommandBuilder;
    options: T;
  }) {
    this.command = command(new SlashCommandBuilder());

    if (typeof options === "object") {
      this.listener = this.subcommandListener;
      this.subcommandGroups = options.subcommandGroups ?? [];
      this.subcommands = options.subcommands ?? [];

      for (const subcommandGroup of this.subcommandGroups) {
        this.command.addSubcommandGroup(subcommandGroup.command);
      }

      for (const subcommand of this.subcommands) {
        this.command.addSubcommand(subcommand.command);
      }
    } else {
      this.listener = options;
      this.subcommandGroups = [];
      this.subcommands = [];
    }
  }
}
