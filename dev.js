'use strict';

var path = require('path');
var nodemon = require('nodemon');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require('./webpack.config');
var clientConfig = config[0];
var serverConfig = config[1];

var statsOptions = {
  chunks: false,
  reasons: true,
  colors: true,
}

var port = process.env.HOT_LOAD_PORT || 9090;

new WebpackDevServer(webpack(clientConfig), {
  contentBase: 'http://localhost:9090',
  publicPath: clientConfig.output.publicPath,
  noInfo: false,
  hot: true,
  stats: statsOptions
}).listen(port, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Hot load server listening at localhost:' + port);
});

var serverBuilt = false;
webpack(serverConfig).watch(300, function(err, stats) {
  if (!serverBuilt) {
    startNodemon();
  }

  serverBuilt = true

  if (err) {
    console.err(err.stack || err);
  }

  process.stdout.write(stats.toString(statsOptions) + '\n');
});

function startNodemon() {
  nodemon({
    script: path.join('build', 'server.js'),
    ignore: path.join('build', 'assets'),
    env: { 'NODE_ENV': 'development' }
  });
}
