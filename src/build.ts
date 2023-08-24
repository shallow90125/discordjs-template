import * as esbuild from "esbuild";

(async () => {
  await esbuild.build({
    entryPoints: ["./src/bot.ts"],
    bundle: true,
    outfile: "./out/bot.js",
    platform: "node",
  });
  await esbuild.build({
    entryPoints: ["./src/index.ts"],
    bundle: true,
    outfile: "./out/index.js",
    platform: "node",
  });
})();
