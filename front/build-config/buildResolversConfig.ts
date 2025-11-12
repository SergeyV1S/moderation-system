import type { IBuildConfigOptions } from "./types";
import type { Configuration } from "webpack";

export const buildResolversConfig = (
  options: IBuildConfigOptions,
): Configuration["resolve"] => ({
  extensions: [".tsx", ".ts", ".js"],
  alias: {
    "@": options.paths.src,
  },
});
