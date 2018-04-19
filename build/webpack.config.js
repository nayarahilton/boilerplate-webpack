const fs = require('fs');
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const optimize = webpack.optimize;
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const generateHTMLPlugins = require('./helpers/generate-html.js');


module.exports = (env) => {
	console.log('TESTE', generateHTMLPlugins())
	const source = './src/pages/'
	const output =  '../dist/assets/'
	const pagesPath =  '../src/pages/'
	const componentsPath =  '../src/components/'
	const layoutsPath =  'src/layouts/'
	let isDev = env === 'development'
	const partialDirName = glob.sync('src/components/**/');
	partialDirName.push(layoutsPath)
	partialDirName.shift()
	partialDirName2 = partialDirName.map(function(e) {return path.join(__dirname, '../' + e)});

	//To accomplish our task we will write a simple function to read the files from our views directory and generate an array of HTMLWebpackPlugins.

	const HTMLPlugins = generateHTMLPlugins(pagesPath, 'hbs');

	let config = {
		//devtool: isDev ? 'eval-cheap-module-source-map' : false,
		entry: mapEntries({
			main: [
				'./src/defaults/main.js'
			]
		}),
		output: {
			filename: 'js/[name].min.js',
			path: path.resolve(__dirname, output)
		},
		module: {
			rules: [
				{
					test: /\.styl$/,
					exclude: /node_modules/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [
							{ loader: 'css-loader', options: {sourceMap: isDev, importLoaders: 1, url: false } },
							{ loader: 'postcss-loader', options: { sourceMap: false, config: { path: './postcss.config.js'} } },
							{ loader: 'stylus-loader' }
							// { loader: 'stylint-loader' }
						]
					})
				},
				{ test: /\.hbs$/, loader: 'handlebars-loader',
				query: {
						extensions: '.hbs',
						partialDirs: partialDirName2
					}
				},
				{ test: /.js$/,
					exclude: /node_modules/,
					use:[
						{ loader: 'eslint-loader', options: { emitError: true, emitWarning: true, failOnError: true } },
						{ loader: 'babel-loader', options: { presets: ['es2015'] } }

					],
				},
			],
		},
		resolve: {
			//files in these directory can be required without a relative path
			modules: ['node_modules'],

			//all these extensions will be resolved without specifying extension in the `require` function
			extensions: ['*', '.js', '.styl', '.hbs'],

			alias: {
				handlebars: 'handlebars/dist/handlebars.min.js',
				components: path.resolve(source, 'components'),
				modules: path.resolve(source, 'modules')
		 }
		},

		plugins: [
			new ExtractTextPlugin('css/[name].css')
		]
		.concat(HTMLPlugins)
	}
	return config;
}
