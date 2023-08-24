import { ShardingManager } from "discord.js";
import "dotenv/config";

const manager = new ShardingManager("./out/bot.js", {
  token: process.env.TOKEN,
});

manager.on("shardCreate", (shard) => {
  shard.on("death", () => console.log(`shard ${shard.id}: death`));
  shard.on("disconnect", () => console.log(`shard ${shard.id}: disconnect`));
  shard.on("message", () => console.log(`shard ${shard.id}: message`));
  shard.on("ready", () => console.log(`shard ${shard.id}: ready`));
  shard.on("reconnecting", () =>
    console.log(`shard ${shard.id}: reconnecting`),
  );
  shard.on("resume", () => console.log(`shard ${shard.id}: resume`));
  shard.on("spawn", () => console.log(`shard ${shard.id}: spawn`));
  shard.on("error", (error) => {
    console.error(`shard ${shard.id}: error, ${error}`);
    shard.respawn();
  });
});

(async () => {
  await manager.spawn();
})();
