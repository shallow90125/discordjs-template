import { DiscordSubcommand } from "types/discord";

export const subcommand = new DiscordSubcommand({
  command: (command) => command.setName("sub").setDescription("sub"),
  listener: async (interaction) => {
    console.log(interaction.commandName);
    console.log(interaction.options.getSubcommandGroup());
    console.log(interaction.options.getSubcommand());
  },
});
