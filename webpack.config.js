// module.exports = require('@leanup/stack-angular/webpack.config');

module.exports = (...args) => {
  const config = require('./webpack.config.angular')(...args);
  //   const config = require('./webpack.config.react')(...args);

  const CopyModulesWebpackPlugin = require('./copy-modules-webpack-plugin');
  config.plugins.shift(0, 1); // remove copy-modules-webpack-plugin
  config.plugins.unshift(
    new CopyModulesWebpackPlugin({
      destination: '.reports/nexus-iq',
      includePackageJsons: true,
    })
  );

  //   const { ESBuildPlugin } = require('esbuild-loader');
  //   config.plugins.shift(0, 1); // remove esbuild
  //   config.plugins.push(new ESBuildPlugin());
  return config;
};
