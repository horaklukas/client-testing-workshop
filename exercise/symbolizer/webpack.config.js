var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: ['whatwg-fetch', './src/symbolizer-component.js'],
  output: { path: path.join(__dirname, 'dist'), filename: 'symbolizer.js' },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};