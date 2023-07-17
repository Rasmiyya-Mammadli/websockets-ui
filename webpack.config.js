const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/server.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.cjs'],
  },
  output: {
    filename: 'server.cjs',
    path: path.resolve(__dirname, 'dist'),
  },
};