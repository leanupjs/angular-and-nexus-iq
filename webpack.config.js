// module.exports = require('@leanup/stack-angular/webpack.config');

module.exports = (...args) => {
  const CopyModulesWebpackPlugin = require('./copy-modules-webpack-plugin');
  const config = require('@leanup/stack-angular/webpack.config')(...args);
  config.plugins.shift(0, 1); // remove copy-modules-webpack-plugin
  config.plugins.unshift(
    new CopyModulesWebpackPlugin({
      destination: '.reports/nexus-iq',
      includePackageJsons: true,
    })
  );
  console.log(config);
  return config;
};
