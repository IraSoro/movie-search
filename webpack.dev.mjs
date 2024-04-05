import common from "./webpack.common.mjs";

export default {
  mode: "development",
  devtool: "cheap-module-source-map",
  ...common,
};
