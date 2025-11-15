import type { Configuration } from "webpack";

import { buildDevServerConfig } from "./buildDevServerConfig";
import { buildLoadersRuleConfig } from "./buildLoadersRuleConfig";
import { buildPluginsConfig } from "./buildPluginsConfig";
import { buildResolversConfig } from "./buildResolversConfig";
import type { IBuildConfigOptions } from "./types";

export const webpackConfig = (options: IBuildConfigOptions): Configuration => {
  const isDev = options.mode === "development";

  return {
    mode: options.mode,
    devtool: isDev ? "eval-source-map" : undefined,
    entry: options.paths.entry,
    output: {
      path: options.paths.output,
      filename: isDev ? "chunks/[name].js" : "chunks/[contenthash].js",
      publicPath: "/",
      clean: true
    },
    plugins: buildPluginsConfig(options),
    module: {
      rules: buildLoadersRuleConfig(options)
    },
    resolve: buildResolversConfig(options),
    devServer: isDev ? buildDevServerConfig(options) : undefined
  };
};

export * from "./types";
