const path = require('path')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: {
    'clipboard-vue': './src/index.js',
    'clipboard-vue.min': './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      }
    ]
  },
  devtool: 'cheap-source-map',
  optimization: {
    minimize: true,
    minimizer: [
        new TerserWebpackPlugin({
            include: '/min/'
        })
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: './src/index.js',
    //       to: 'clipboard-vue.js'
    //     }
    //   ]
    // })
  ]
}