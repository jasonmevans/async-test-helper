const webpack = require('webpack');
const path = require('path');

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine', 'jasmine-matchers', 'babel-polyfill'],
    reporters: ['spec', 'coverage-istanbul'],

    // logLevel: config.LOG_DEBUG,

    listenAddress: 'localhost',

    files: [
      'test/index.js'
    ],

    preprocessors: {
      'test/index.js': [ 'webpack', 'sourcemap' ]
    },

    webpack: {
      devtool: '#inline-source-map',
      module: {
        rules: [
          {
            test: /\.js$/,
            enforce: 'pre',
            use: ['jshint-loader'],
            exclude: /node_modules/
          },
          {
            test: /\.js$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['es2015']
              }
            },
            exclude: /node_modules/
          },
          {
            test: /\.js$/,
            enforce: 'post',
            use: {
              loader: 'istanbul-instrumenter-loader',
              options: {
                esModules: true
              }
            },
            exclude: /node_modules|\/test\//
          }
        ]
      },
      resolve: {
        alias: {
          Src: '../src'
        }
      }
    },

    coverageIstanbulReporter: {
      reports: [ 'text', 'lcovonly' ],
      dir: path.join(__dirname, 'coverage'),
      fixWebpackSourcePaths: true
    },

    webpackServer: {
      noInfo: true
    },

    webpackMiddleware: {
      stats: 'errors-only'
    }

  });
}
