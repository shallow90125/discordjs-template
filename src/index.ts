import { ClusterManager } from "discord-hybrid-sharding";
import { zEnv } from "utils";

const manager = new ClusterManager("src/bot.ts", {
  totalShards: "auto",
  shardsPerClusters: 2,
  token: zEnv.DISCORD_TOKEN,
});

manager.spawn({ timeout: -1 });
