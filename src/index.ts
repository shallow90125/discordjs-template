import { ClusterManager } from "discord-hybrid-sharding";
import { zEnv } from "utils";

const build = await Bun.build({
  entrypoints: ["src/bot.ts"],
  outdir: "out",
  target: "bun",
});

if (!build.success) {
  throw new AggregateError(build.logs);
}

const manager = new ClusterManager("./out/bot.js", {
  totalShards: "auto",
  shardsPerClusters: 2,
  token: zEnv.DISCORD_TOKEN,
});

manager.spawn({ timeout: -1 });
