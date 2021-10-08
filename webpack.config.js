const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackAssetsManifest = require("webpack-assets-manifest");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  plugins: [
    new WebpackAssetsManifest({
      output: "component-manifest.json",
      customize(entry) {
        if (entry.key === "main.js" || entry.key.startsWith("component-")) {
          return entry;
        }
        return false;
      },
    }),
    new HtmlWebpackPlugin(),
    process.env.ANALYZE === "true" &&
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: false,
      }),
  ].filter(Boolean),
  output: {
    clean: true,
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "public"),
  },
};
