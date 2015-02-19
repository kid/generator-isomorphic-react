var webpack = require('webpack');

var path = require('path');
var argv = require('minimist')(process.argv.slice(2));

var DEBUG = !argv.release;

var client = {
  cache: DEBUG,
  debug: DEBUG,
  devtool: DEBUG ? '#inline-source-map' : false,

  entry: [
    'webpack-dev-server/client?http://localhost:9090',
    'webpack/hot/dev-server',
    './src/client/client.jsx'
  ],
  output: {
    path: __dirname + '/build/assets/',
    filename: 'client.js',
    sourcePrefix: '  ',
    publicPath: 'http://localhost:9090/build/assets/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader', exclude: /node_modules/ },
      { test: /\.jsx?$/, loaders: ['react-hot', 'babel-loader?experimental'], exclude: /node_modules/ }
    ]
  }
};

var server = {
  cache: DEBUG,
  debug: DEBUG,
  devtool: DEBUG ? '#inline-source-map' : false,

  entry: './src/server/server.js',
  output: {
    path: __dirname + '/build/',
    publicPath: './build/',
    sourcePrefix: '  ',
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  externals: /^[a-z\-0-9]+$/i,
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader?experimental', exclude: /node_modules/ }
    ]
  }
};

module.exports = [client, server];
