"use strict";

var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var argv = require("minimist")(process.argv.slice(2));

var DEBUG = !argv.release;

var client = {
  cache: DEBUG,
  debug: DEBUG,
  devtool: DEBUG ? "#inline-source-map" : false,

  entry: [
    "webpack-dev-server/client?http://localhost:9090",
    "webpack/hot/dev-server",
    "./src/client/client.jsx"
  ],
  output: {
    path: __dirname + "/build/assets/",
    filename: "client.js",
    sourcePrefix: "  ",
    publicPath: "http://localhost:9090/build/assets/"
  },
  plugins: DEBUG ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin("client.css")
  ] : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin("client.css")
  ],
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: "jsxhint-loader",
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass")
      },
      {
        test: /\.jsx?$/,
        loaders: ["react-hot", "babel-loader?experimental"],
        exclude: /node_modules/
      }
    ]
  }
};

var server = {
  cache: DEBUG,
  debug: DEBUG,
  devtool: DEBUG ? "#inline-source-map" : false,

  entry: "./src/server/server.js",
  output: {
    path: __dirname + "/build/",
    publicPath: "./build/",
    sourcePrefix: "  ",
    filename: "server.js",
    libraryTarget: "commonjs2"
  },
  target: "node",
  externals: /^[a-z\-0-9]+$/i,
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: "jsxhint-loader",
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader?experimental",
        exclude: /node_modules/
      }
    ]
  }
};

module.exports = [client, server];
