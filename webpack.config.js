
var webpack = require('webpack');
var path = require('path');

module.exports = {
  target: "electron-renderer",
  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/build'),
    publicPath: 'http://localhost:8080/build/'
  },

  module: {
    loaders: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      }, {
        test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'
      }, {
        test: /\.css$/, loader: 'style-loader!css-loader'
      }, {
        test: /\.png$/, loader: 'file-loader'
      }
    ]
  },
  resolve: {
    alias: {
      '~': path.resolve('./src')
    },
    extensions: ['.jsx', '.js']
  }
};