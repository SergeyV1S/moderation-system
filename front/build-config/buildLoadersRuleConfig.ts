import { defineReactCompilerLoaderOption, reactCompilerLoader } from "react-compiler-webpack";

import MiniCssExtractPlugin from "mini-css-extract-plugin";

import type { IBuildConfigOptions } from "./types";

export const buildLoadersRuleConfig = (options: IBuildConfigOptions) => {
  const cssLoader = {
    test: /\.css$/i,
    oneOf: [
      {
        include: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                namedExport: false,
                exportLocalsConvention: "asIs"
              }
            }
          }
        ]
      }
    ]
  };

  const assetsLoader = [
    {
      test: /\.(png|svg|jpg|jpeg|webp|gif)$/i,
      type: "asset/resource"
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: "asset/resource"
    }
  ];

  // const tsLoader = {
  //   test: /\.tsx?$/,
  //   exclude: /node_modules/,
  //   use: [
  //     {
  //       loader: "ts-loader",
  //       options: {
  //         getCustomTransformers: () => ({
  //           before: [
  //             options.mode === "development" && ReactRefreshTypeScript(), нужно установить 'react-refresh-typescript'
  //           ].filter(Boolean)
  //         }),
  //         transpileOnly: true
  //       }
  //     },
  //     {
  //       loader: reactCompilerLoader,
  //       options: defineReactCompilerLoaderOption({})
  //     }
  //   ]
  // };

  const swcLoader = {
    test: /\.[jt]sx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "swc-loader",
        options: {
          jsc: {
            parser: {
              syntax: "typescript",
              tsx: true,
              decorators: true
            },
            transform: {
              react: {
                runtime: "automatic",
                refresh: options.mode === "development"
              }
            }
          }
        }
      },
      {
        loader: reactCompilerLoader,
        options: defineReactCompilerLoaderOption({})
      }
    ]
  };

  return [cssLoader, ...assetsLoader, swcLoader];
};
