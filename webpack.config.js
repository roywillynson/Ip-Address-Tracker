const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DotenvWebpackPlugin = require("dotenv-webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: ["./src/app.js"],
  output: {
    filename: "[name].bundle.js",
    path: path.join(__dirname, "/dist"),
    publicPath: "/",
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    proxy: {
      "/api/": {
        target: "https://geo.ipify.org",
        pathRewrite: { "^/api/": "/api/" },
        secure: false,
        changeOrigin: true,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: "/node_modules/",
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "entry",
                  corejs: 3,
                  modules: false,
                  targets: {
                    esmodules: true,
                  },
                },
              ],
            ],
            plugins: [
              ["@babel/plugin-transform-runtime", { regenerator: false }],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
    runtimeChunk: {
      name: "runtime",
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  plugins: [
    new DotenvWebpackPlugin({
      path: path.join(__dirname, ".env"),
      safe: true,
    }),
    new CopyWebpackPlugin({
      patterns: [path.join(__dirname, "public")],
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "public/index.html"),
    }),
  ],
};
