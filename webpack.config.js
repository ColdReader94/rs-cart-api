const webpack = require('webpack');
const path = require('path');

module.exports = {
  target: 'node',
  module: {
    rules: [
      {
        test: /.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.join(__dirname, 'bundled'),
    library: 'handler',
    libraryTarget: "commonjs2"
  },
  plugins: [
    new webpack.IgnorePlugin({
      checkResource(resource) {
        const lazyImports = [
            '@nestjs/microservices',
            'cache-manager',
            '@nestjs/microservices/microservices-module',
            '@nestjs/websockets/socket-module',
            'class-transformer',
            'class-transformer/storage',
            'class-validator',
            'pg-native',
        ];
        if (!lazyImports.includes(resource)) {
          return false;
        }
        try {
          require.resolve(resource);
        } catch (err) {
          return true;
        }
        return false;
      },
    }),
  ],
};