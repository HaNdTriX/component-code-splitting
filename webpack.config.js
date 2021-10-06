const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackAssetsManifest = require("webpack-assets-manifest");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  plugins: [
    new WebpackAssetsManifest({
      output: "component-manifest.json",
      customize(entry) {
        if (entry.key.startsWith("component-")) {
          return entry;
        }
        return false;
      },
    }),
    new HtmlWebpackPlugin(),
    process.env.ANALYSE === "true" && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
  output: {
    clean: true,
    filename: "[name].[contenthash].js",
  },
};
