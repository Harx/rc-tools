'use strict';

var getWebpackCommonConfig = require('./getWebpackCommonConfig');
var getBabelCommonConfig = require('./getBabelCommonConfig');
var resolveCwd = require('./resolveCwd');

module.exports = function () {
  var indexSpec = resolveCwd('tests/index.js');
  var files = [
    require.resolve('console-polyfill/index.js'),
    require.resolve('es5-shim/es5-shim.js'),
    require.resolve('es5-shim/es5-sham.js'),
    require.resolve('html5shiv/dist/html5shiv.js'),
    indexSpec,
  ];
  var preprocessors = {};
  preprocessors[indexSpec] = ['webpack', 'sourcemap'];
  return {
    reporters: ['mocha'],
    client: {
      mocha: {
        reporter: 'html', // change Karma's debug.html to the mocha web reporter
        ui: 'bdd',
      },
    },
    frameworks: ['mocha'],
    files,
    preprocessors,
    webpack: {
      babel: getBabelCommonConfig(),
      resolveLoader: getWebpackCommonConfig.getResolveLoader(),
      devtool: 'inline-source-map',
      resolve: getWebpackCommonConfig.getResolve(),
      module: {
        loaders: getWebpackCommonConfig.getLoaders().concat(getWebpackCommonConfig.getCssLoaders()),
      },
    },
    webpackServer: {
      noInfo: true, //please don't spam the console when running in karma!
    },
  };
};