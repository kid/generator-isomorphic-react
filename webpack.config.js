var webpack = require('webpack');

var client = {
  cache: true,
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:9090',
    'webpack/hot/dev-server',
    './src/client/index.jsx'
  ],
  output: {
    path: __dirname + '/build/assets',
    filename: 'bundle.js',
    publicPath: 'http://localhost:9090/build/assets'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.js$/, loaders: ['react-hot', 'babel-loader'], exclude: /node_modules/ },
      { test: /\.jsx$/, loaders: ['react-hot', 'babel-loader'], exclude: /node_modules/ }
    ]
  }
};

module.exports = [client];
