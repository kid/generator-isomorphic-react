"use strict";

var webpack = require("webpack");
var update = require("react/lib/update");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var argv = require("minimist")(process.argv.slice(2));

var DEBUG = !argv.release;
var HOT = DEBUG && argv.hot;

var common = {
  output: {
    sourcePrefix: "  "
  },

  cache: DEBUG,
  debug: DEBUG,
  devtool: DEBUG ? "eval" : "source-map",

  stats: {
    chunks: false,
    colors: true,
    reasons: DEBUG
  },

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
        test: /\.json$/,
        loader: "json-loader",
        exclude: /node_modules/
      }
    ]
  }
};

var client = update(common, {
  entry: {
    $set: DEBUG ? [
      "webpack-dev-server/client?http://localhost:9090",
      "webpack/hot/dev-server",
      "./src/client/client.jsx"
    ] : "./src/client/client.jsx"
  },

  output: {
    path: { $set: __dirname + "/build/assets/" },
    filename: { $set: DEBUG ? "client.js" : "client.[hash].js" },
    publicPath: { $set: HOT ? "http://localhost:9090/build/assets/" : "./build/assets/" }
  },

  plugins: {
    $push: [
      new ExtractTextPlugin(DEBUG ? "client.css" : "client.[hash].css"),
      new webpack.DefinePlugin({
        "__DEV__": DEBUG,
        "__HOT_MODE__": HOT,
        "__SERVER__": false
      })
    ].concat(DEBUG ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ] : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.AggressiveMergingPlugin()
    ])
  },

  module: {
    loaders: {
      $push: [
        {
          test: /\.jsx?$/,
          loaders: HOT ? ["react-hot", "babel-loader?experimental"] : ["babel-loader?experimental"],
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass")
        },
        {
          test: /\.png$/,
          loader: "url-loader?limit=10000&mimetype=image/png"
        }
      ]
    }
  }
});

var server = update(common, {
  entry: { $set: "./src/server/server.js" },

  output: {
    path: { $set: __dirname + "/build/" },
    filename: { $set: "server.js" },
    publicPath: { $set: "./build/" },
    libraryTarget: { $set: "commonjs" }
  },

  target: { $set: "node" },
  externals: { $set: /^[a-z\-0-9]+$/i },
  node: {
    $set: {
      __filename: false,
      __dirname: false,
      console: false,
      global: false,
      process: false
    }
  },

  plugins: {
    $push: [
      new webpack.DefinePlugin({
        "__DEV__": DEBUG,
        "__HOT_MODE__": HOT,
        "__SERVER__": true,
      })
    ]
  },
  
  module: {
    loaders: {
      $push: [
        {
          test: /\.jsx?$/,
          loader: "babel-loader?experimental",
          exclude: /node_modules/
        }
      ]
    }
  }
});

module.exports = [client, server];
