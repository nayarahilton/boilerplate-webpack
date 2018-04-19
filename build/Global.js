
global.fs = require('fs');
global.path = require('path');
global.glob = require('glob');
global.PACKAGE = require('../package.json').config;
global.source = PACKAGE.source;
global.output =  PACKAGE.output;
global.pagesPath =  PACKAGE.pagesPath;
global.componentsPath = PACKAGE.componentsPath;
global.layoutsPath = PACKAGE.layoutsPath;
global.webpack = require('webpack');
global.optimize = webpack.optimize;
global.HTMLWebpackPlugin = require('html-webpack-plugin');
global.ExtractTextPlugin = require('extract-text-webpack-plugin');
global.nay = 'nay'

