const fs = require('fs');
const path = require('path');
const glob = require('glob');
const optimize = require('webpack').optimize;
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = (env) => {
	const source = './src/js/'
	const output =   'assets'

	//expands source for target apps and merge objects with give 'main'
	function mapEntries(main) {
		return Object.assign(glob.sync(source + '/*.js').reduce(function(x, file) {
			var name = path.basename(file, '.js');
			x[ name ] = path.resolve(source, name);
			return x;
		}, {}), main)
	}

	//To accomplish our task we will write a simple function to read the files from our views directory and generate an array of HTMLWebpackPlugins.
	function generateHTMLPlugins (templateDir) {
		const templates = fs.readdirSync(path.resolve(__dirname, templateDir))
		return templates.map(item => {
			// Split names and extension
			const parts = item.split('.')
			const name = parts[0]
			const extension = parts[1]
			return new HTMLWebpackPlugin({
				alwaysWriteToDisk: true,
				inject: false,
				filename: path.resolve(__dirname, `html/${name}.html`),
				template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
			})
		})
	}

	const HTMLPlugins = generateHTMLPlugins('./src/html/pages');

	let config = {
		entry: mapEntries({
			main: [
			'./global.js', 
			path.resolve(source, 'main.js')
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
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [
							{ loader: 'css-loader', options: {sourceMap: true, url: false } },
							{ loader: 'stylus-loader' },
						]
					})
				},
				{ test: /\.hbs$/, loader: 'handlebars-loader',
				query: {
						extensions: ".hbs",
						partialDirs: [
								path.join(__dirname, 'src/html/components'),
								path.join(__dirname, 'src/html/layouts')
						]
					} 
				},
				{ test: /.js$/,
					exclude: /node_modules/,
					use:[
						{ loader: "eslint-loader", options: { emitError: true, emitWarning: true, failOnError: true } },
						{ loader: "babel-loader", options: { presets: ["es2015"] } }
						
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
				handlebars: 'handlebars/dist/handlebars.min.js'
		 }
		},
		
		plugins: [
			new ExtractTextPlugin("css/[name].css")
		]
		.concat(HTMLPlugins)
	}
	return config;
}