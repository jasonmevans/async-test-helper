const webpack = require('webpack');

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine', 'jasmine-matchers', 'babel-polyfill'],
    reporters: ['spec'],

    // logLevel: config.LOG_DEBUG,

    files: [
      'test.webpack.js'
    ],

    preprocessors: {
      'test.webpack.js': [ 'webpack', 'sourcemap' ]
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
          }
        ]
      },
      resolve: {
        alias: {
          Src: '../src'
        }
      }
    },

    webpackServer: {
      noInfo: true
    },

    webpackMiddleware: {
      stats: 'errors-only'
    }

  })
}
