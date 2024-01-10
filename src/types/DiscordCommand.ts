import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";
import { DiscordSubcommand } from "./DiscordSubcommand";
import { DiscordSubcommandGroup } from "./DiscordSubcommandGroup";

export class DiscordCommand<
  T extends
    | ((interaction: ChatInputCommandInteraction<"cached">) => Promise<void>)
    | {
        subcommands: DiscordSubcommand[];
        subcommandGroups: DiscordSubcommandGroup[];
      },
> {
  readonly command: T extends (
    interaction: ChatInputCommandInteraction<"cached">,
  ) => Promise<void>
    ? SlashCommandBuilder
    : SlashCommandSubcommandsOnlyBuilder;
  readonly listener: (
    interaction: ChatInputCommandInteraction<"cached">,
  ) => Promise<void>;
  readonly subcommandGroups: DiscordSubcommandGroup[];
  readonly subcommands: DiscordSubcommand[];

  private subcommandListener = async (
    interaction: ChatInputCommandInteraction<"cached">,
  ) => {
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
      this.subcommandGroups = options.subcommandGroups;
      this.subcommands = options.subcommands;
      this.listener = this.subcommandListener;
      for (const subcommand of options.subcommands) {
        this.command.addSubcommand(subcommand.command);
      }
      for (const subcommandGroup of options.subcommandGroups) {
        this.command.addSubcommandGroup(subcommandGroup.command);
      }
    } else {
      this.subcommandGroups = [];
      this.subcommands = [];
      this.listener = options;
    }
  }
}
