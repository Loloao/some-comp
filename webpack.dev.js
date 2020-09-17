const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const getAbsolutePath = (pathname) => path.join(__dirname, pathname)

module.exports = {
  entry: getAbsolutePath('src/index.js'),
  output: {
    path: getAbsolutePath('dist'),
    filename: '[name].[hash].js',
    publicPath: '/', // string
    // the url to the output directory resolved relative to the HTML page

    // library: 'MyLibrary', // string,
    // the name of the exported library

    // libraryTarget: 'umd' // universal module definition
    // the type of the exported library
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    port: 8001,
    hot: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
    alias: {
      main: path.resolve(__dirname, '../src/main.js'),
      environment: path.resolve(__dirname, '../config/environment.js'),
      i18n: path.resolve(__dirname, '../src/i18n'),
      'test.config': path.resolve(__dirname, '../config/test.config.js'),
      '@src': path.resolve(__dirname, '../src'),
      '@Settings': path.resolve(__dirname, '../src/routes/Main/routes/Settings'),
      '@Teams': path.resolve(__dirname, '../src/routes/Main/routes/Teams'),
      '@Templates': path.resolve(__dirname, '../src/routes/Main/routes/Templates'),
      '@Deployments': path.resolve(__dirname, '../src/routes/Main/routes/Deployments'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true,
            },
          },
        ],
        include: getAbsolutePath('./src'),
        exclude: /node_modules/,
      },
      {
        test: /\.(svg|jpg|png|gif|jpeg)$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: '[path][name].[hash].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'sass-loader',
        ],
        exclude: [path.resolve(__dirname, '..', 'node_modules')],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
        // 使 node_modules 中的 css 文件不受 css module 影响
        exclude: [getAbsolutePath('./node_modules')],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: [getAbsolutePath('./node_modules')],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: '组件',
      filename: 'index.html',
      inject: true,
      template: getAbsolutePath('./index.html'),
    }),
  ],
}
