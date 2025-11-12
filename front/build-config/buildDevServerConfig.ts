import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

import type { IBuildConfigOptions } from "./types";

export const buildDevServerConfig = (options: IBuildConfigOptions): DevServerConfiguration => ({
  port: options.port,
  historyApiFallback: true,
  hot: true
});
