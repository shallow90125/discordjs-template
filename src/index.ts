import { ShardEvents, ShardingManager } from "discord.js";
import { zEnv } from "./utils";

(async () => {
  const manager = new ShardingManager("./out/bot.js", {
    token: zEnv.TOKEN,
  });

  manager.on("shardCreate", (shard) => {
    for (const shardEvent of Object.values(ShardEvents)) {
      shard.on(shardEvent, () => {
        console.log(`shard ${shard.id}: ${shardEvent}`);
      });
    }
  });

  await manager.spawn();
})();
