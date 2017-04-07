var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
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
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader?paths=node_modules/nib/lib'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.[ot]tf$/,
        loader: 'url-loader?limit=65000&mimetype=application/octet-stream'
      }

    ]
  },
  devServer: {
    proxy: {
      "/get-tree-data": {
        "target": "http://localhost:9090",
        "secure": false
      }
    },
    "host": "0.0.0.0"
  }
};
