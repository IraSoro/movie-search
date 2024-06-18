import path from "path";
import { fileURLToPath } from "url";
// plugins
import ESLintPlugin from "eslint-webpack-plugin";
import HtmlWebpackPlugin from "html-plugin-webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";
import DotenvWebpackPlugin from "dotenv-webpack";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  entry: "./src/index.ts",
  output: {
    path: path.join(__dirname, "public"),
    filename: "[name].bundle.js",
    hashFunction: "xxhash64",
  },
  performance: {
    hints: false,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [
    new ESLintPlugin({
      useEslintrc: true,
    }),
    new HtmlWebpackPlugin({
      title: "Search movies",
      favicon: "./static/favicon.ico",
      inject: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "assets",
          to: "assets",
        },
        {
          from: "static",
          to: "static",
        },
      ],
    }),
    new DotenvWebpackPlugin({
      systemvars: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx$/,
        include: [/src/],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: "defaults",
                  },
                ],
                [
                  "@babel/preset-react",
                  {
                    runtime: "automatic",
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)?$/,
        include: [/src/],
        use: "ts-loader",
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "/static/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    devMiddleware: {
      writeToDisk: true,
    },
    // allowedHosts: [],
    // compress: true,
    port: 7070,
  },
};
