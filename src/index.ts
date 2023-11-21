import { ShardEvents, ShardingManager } from "discord.js";
import { zEnv } from "./utils";

(async () => {
  const manager = new ShardingManager("./out/bot.js", {
    token: zEnv.TOKEN,
  });

  manager.on("shardCreate", (shard) => {
    Object.values(ShardEvents).map((shardEvent) =>
      shard.on(shardEvent, () => {
        console.log(shard.id);
      }),
    );
  });

  await manager.spawn();
})();
