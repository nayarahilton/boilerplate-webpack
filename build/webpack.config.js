require('./Global')
const generateHTMLPlugins = require('./helpers/generate-html')
const mapEntries = require('./helpers/map-entries')
console.log(output)

module.exports = (env) => {
	let isDev = env === 'development'
	const partialDirName = glob.sync(componentsPath);
	partialDirName.push(layoutsPath)
	partialDirName.shift()
	partialDirName2 = partialDirName.map(function(e) {return path.join(__dirname, '../' + e)});

	const HTMLPlugins = generateHTMLPlugins(path.resolve(pagesPath), 'hbs');

	let config = {
		//devtool: isDev ? 'eval-cheap-module-source-map' : false,
		entry: mapEntries({
			main: [
				'./src/defaults/main.js'
			]
		}),
		output: {
			filename: 'js/[name].min.js',
			path: path.join(__dirname, output)
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
