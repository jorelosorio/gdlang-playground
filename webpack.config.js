const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const distPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');

module.exports = (_env, argv) => {
  const envDir = argv.mode === 'production' ? 'prod' : 'dev';
  const staticPath = path.resolve(srcPath, 'static');

  return [
    {
      name: 'playground',
      entry: path.resolve(srcPath, 'index.ts'),
      output: {
        path: path.resolve(distPath, envDir),
        filename: 'main.js',
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        fallback: { fs: false },
      },
      module: {
        rules: [
          {
            test: /\.(ts|tsx)$/,
            use: 'babel-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
        ],
      },
      devtool: 'eval-source-map',
      devServer: {
        port: 8080,
        hot: true,
        open: true,
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(srcPath, 'index.html'),
          filename: 'index.html',
        }),
        new MonacoWebpackPlugin(),
        new CopyPlugin({
          patterns: [
            {
              from: staticPath,
              to: path.resolve(distPath, envDir, 'static'),
            },
          ],
        }),
      ],
    },
  ];
};
