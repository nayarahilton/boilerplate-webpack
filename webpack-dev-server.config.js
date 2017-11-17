require('./webpack.config.js');
var devConfig = require('./webpack.config.js')();
var path = require('path');
var HTMLWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var html = new HTMLWebpackHarddiskPlugin();

devConfig.devServer = {
    contentBase: path.resolve(__dirname, 'html'),
    publicPath: '/assets/',
    host: 'localhost',
    port: 9000,
    hot: true,
    inline: true,
    watchContentBase: true,
    overlay: true,
    compress: true,
    open: true,
    openPage: 'webpack-dev-server/',
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    }
}

devConfig.output.path = '/assets/';
devConfig.plugins.push(html);

module.exports = devConfig;

console.log('path', devConfig.output.path)