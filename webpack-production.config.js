var WebpackStripLoader = require('strip-loader');
var devConfig = require('./webpack.config.js');
var optimize = require('webpack').optimize;
var stripLoader = {
 test: [/\.js$/, /\.es6$/],
 exclude: /node_modules/,
 loader: WebpackStripLoader.loader('console.log') //remove any console.log statements 
}
devConfig().module.rules.push(stripLoader);
devConfig().plugins.push(new optimize.UglifyJsPlugin({
    compress: { warnings: false },
    minimize: true
}))
module.exports = devConfig;
