const path = require('path');

module.exports = {
  entry : './src/app.js',
  output: {
    path    : path.join(__dirname, '/public/build/'),
    filename: 'bundle.js',
  },
  watch  : true,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: 'development',
  module: {
    rules: [
      {
        test   : /.jsx?$/,
        loader : 'babel-loader',
        exclude: /node_modules/,
        query  : {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
};
