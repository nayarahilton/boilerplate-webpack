const WebpackStripLoader = require('strip-loader');
const devConfig = require('./webpack.config.js')('production');
const optimize = require('webpack').optimize;

//Remove any console.log statements

const stripLoader = {
 test: [/\.js$/, /\.es6$/],
 exclude: /node_modules/,
 loader: WebpackStripLoader.loader('console.log')
}

//Minimize JS

const UglifyJs = new optimize.UglifyJsPlugin({
	compress: { warnings: false },
	minimize: true
})

devConfig.module.rules.push(stripLoader);
devConfig.plugins.push(UglifyJs);

module.exports = devConfig;
