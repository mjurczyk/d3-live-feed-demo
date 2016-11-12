var webpack = require('webpack');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: './dist/app.js',
    publicPath: './assets/'
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      { 
        test: /\.css$/, 
        loader: 'style-loader!css-loader'
      },
      { 
        test: /\.html$/, 
        loader: 'html'
      }
    ]
  }
};
