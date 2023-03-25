// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV == "production";

const config = {
  output: {
    path: path.resolve(__dirname, "dist")
  },
  entry: {
        'weasyprint': path.resolve(__dirname, 'weasyprint'),
        'invoice': path.resolve(__dirname, 'templates/pdf/invoice/invoice.scss'),
    },
  devServer: {
    open: true,
    port: 3000,
    host: "localhost",
        proxy: {
            '/': 'http://localhost:5000',
        },
    liveReload: true,
    watchFiles: ["*", "templates/*", "templates/**/*"]
  },
  plugins: [
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader"
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset"
      }

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ]
  }
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
