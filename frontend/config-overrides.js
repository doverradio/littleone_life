const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    crypto: require.resolve('crypto-browserify'),
    path: require.resolve('path-browserify'),
    fs: false,
    buffer: require.resolve('buffer/'),
    stream: require.resolve('stream-browserify'),
    process: require.resolve('process/browser'),
  };

  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  );

  return config;
};
