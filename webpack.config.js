let path = require('path');
let webpack = require('webpack');

module.exports = {
  entry: ['./src/components/App.js'],

  output: {
    path: path.join(__dirname, '/public/'),
    filename: 'bundle.js'
  },

  devServer: {
    hot: true,
    inline: true,
    host: '0.0.0.0',
    port: 4000,
    contentBase: __dirname + '/public/'
  },

  module: {
    rules:[
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  node: {
    fs: 'empty'
  }
}