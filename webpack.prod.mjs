import common from "./webpack.common.mjs";

export default {
  mode: "production",
  devtool: "hidden-source-map",
  ...common,
};
