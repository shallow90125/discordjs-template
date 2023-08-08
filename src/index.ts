import { ShardingManager } from "discord.js";
import "dotenv/config";

const manager = new ShardingManager("./out/bot.js", {
  token: process.env.TOKEN,
});

manager.on("shardCreate", (shard) => {
  console.log(`shard: ${shard.id}`);
});

manager.spawn();
