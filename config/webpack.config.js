const path = require('path')

module.exports = {
  entry: './server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  mode: 'development',
  resolve: {
    extensions: ['.js'],
    alias: {
      '@network': path.resolve(__dirname, 'network/'),
      '@components': path.resolve(__dirname, 'components/'),
      '@chat': path.resolve(__dirname, 'components/chat/'),
      '@message': path.resolve(__dirname, 'components/message/'),
      '@user': path.resolve(__dirname, 'components/user/')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    port: 3000,
    compress: true
  }
}
