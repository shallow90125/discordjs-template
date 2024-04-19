export type SomeRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

export { DiscordCommand } from "./DiscordCommand";
export { DiscordEvent } from "./DiscordEvent";
export { DiscordSubcommand } from "./DiscordSubcommand";
export { DiscordSubcommandGroup } from "./DiscordSubcommandGroup";
export { DiscordHybridClient } from "./DiscordHybridClient";
