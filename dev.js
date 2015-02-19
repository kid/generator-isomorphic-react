'use strict';

// This little dev server is basically a wrapped express server that
// 'hot loads' our javascript for super fast live reload in development
var webpack = require('webpack');
var config = require('./webpack.config')[0];
var WebpackDevServer = require('webpack-dev-server');

var port = process.env.HOT_LOAD_PORT || 9090;

new WebpackDevServer(webpack(config), {
  contentBase: 'http://localhost:9090',
  publicPath: config.output.publicPath,
  noInfo: true,
  hot: true,
  stats: {
    reasons: true,
    colors: true
  }
}).listen(port, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Hot load server listening at localhost:' + port);
});
