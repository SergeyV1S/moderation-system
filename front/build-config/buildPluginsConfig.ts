import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import DotenvPlugin from "dotenv-webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { DefinePlugin, ProgressPlugin } from "webpack";
import type { Configuration } from "webpack";
import WorkboxPlugin from "workbox-webpack-plugin";

// import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import type { IBuildConfigOptions } from "./types";

export const buildPluginsConfig = (options: IBuildConfigOptions) => {
  const plugins: Configuration["plugins"] = [
    new DefinePlugin({
      MODE: JSON.stringify(options.env.MODE)
    }),
    new HtmlWebpackPlugin({
      template: options.paths.html,
      favicon: options.paths.favicon
    }),
    new DotenvPlugin({ path: ".env", systemvars: true }),
    new MiniCssExtractPlugin({
      filename: options.mode === "development" ? "styles/[name].css" : "[contenthash].css"
    }),
    new CopyPlugin({
      patterns: [{ from: "public", to: "" }]
    }),
    new WorkboxPlugin.InjectManifest({
      mode: options.mode,
      swSrc: options.paths.sw,
      swDest: "sw.js",
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
    })
  ];

  if (options.mode === "development") {
    plugins.push(
      new ForkTsCheckerWebpackPlugin(),
      new ProgressPlugin(),
      new ReactRefreshWebpackPlugin()
    );
  }

  // if (options.mode === "production") {
  //   plugins.push(new BundleAnalyzerPlugin());
  // }

  return plugins;
};
