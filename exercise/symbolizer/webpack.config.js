var path = require('path');
var webpack = require('webpack');

module.exports = {
  //entry: ['whatwg-fetch', './src/symbolizer-component.js'],
  entry: ['whatwg-fetch', './example/example.js'],
  output: { path: path.join(__dirname, 'dist'), filename: 'symbolizer-example.js' },
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
  devServer: {
    proxy: {
      "/get-tree-data": {
        "target": "http://localhost:9090",
        "secure": false
      }
    }
  }
};
