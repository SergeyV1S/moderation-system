import dotenv from "dotenv";
import path from "path";

import type { IExternalVars } from "./build-config";
import { webpackConfig } from "./build-config";

dotenv.config();

export default (env: IExternalVars) => {
  const config = webpackConfig({
    env,
    mode: env.MODE,
    port: process.env.PORT ? +process.env.PORT : 5173,
    paths: {
      entry: path.resolve(__dirname, "src", "main.tsx"),
      html: path.resolve(__dirname, "index.html"),
      output: path.resolve(__dirname, "dist"),
      favicon: path.resolve(__dirname, "public", "favicon.png"),
      src: path.resolve(__dirname, "src")
    }
  });

  return config;
};
