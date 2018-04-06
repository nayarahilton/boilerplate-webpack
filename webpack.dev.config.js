const devConfig = require('./webpack.config.js')('development');
const path = require('path');
const HTMLWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const html = new HTMLWebpackHarddiskPlugin(); 
/* When using webpack-dev-server the html-webpack-plugin doesn't write to disk,
but the html-webpack-harddisk-plugin to force the html to be written to disk */

devConfig.devServer = {
    contentBase: [path.resolve(__dirname, 'dist'), path.resolve(__dirname)], 
    // Serves HTML folder and root folder to access assets folder
    publicPath: '/assets/', 
    // Changes default path('./') to path where assets is locate (path in html head tags)
    host: '127.0.0.1',
    port: 9000,
    watchContentBase: true,
    overlay: true, 
    //Shows lint errors
    //open: true,
    //openPage: 'webpack-dev-server/', // shows status feedback
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    }
}

devConfig.output.path = '/assets/'; //Must to be the same of dev server public path
devConfig.plugins.push(html);

module.exports = devConfig;

