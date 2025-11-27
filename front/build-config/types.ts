export interface IBuildConfigPaths {
  entry: string;
  html: string;
  favicon: string;
  output: string;
  src: string;
  sw: string;
}

export type TBuildMode = "production" | "development";

export interface IExternalVars {
  MODE: TBuildMode;
}

export interface IBuildConfigOptions {
  env: IExternalVars;
  port: number;
  mode: TBuildMode;
  paths: IBuildConfigPaths;
  analyzer?: boolean;
}
