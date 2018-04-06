const fs = require('fs');
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const optimize = webpack.optimize;
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = (env) => {
	const source = './src/js/'
	const output =   'dist/assets'
	let isDev = env === 'development'
	process.noDeprecation = true;

	//To accomplish our task we will write a simple function to read the files from our views directory and generate an array of HTMLWebpackPlugins.

	function generateHTMLPlugins (templateDir) {
        const templates = fs.readdirSync(path.resolve(__dirname, templateDir))
        return templates.map(item => {
            // Split names and extension
            const parts = item.split('.')
            const name = parts[0]
			const extension = parts[1]
			console.log('nunjucks-html-loader!' + path.resolve(__dirname, `${templateDir}/${name}.${extension}`))
            return new HTMLWebpackPlugin({
                alwaysWriteToDisk: true,
                inject: false,
                filename: path.resolve(__dirname, `dist/${name}.html`),
                template: 'nunjucks-html-loader!' + path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
			})
        })
    }

	//expands source for target apps and merge objects with give 'main'
	function mapEntries(main) {
		return Object.assign(glob.sync(source + '/*.js').reduce(function(x, file) {
			var name = path.basename(file, '.js');
			x[ name ] = path.resolve(source, name);
			return x;
		}, {}), main)
	}

	const HTMLPlugins = generateHTMLPlugins('./src/html/pages');

	let config = {
		devtool: isDev ? 'inline-sourcemap' : false,
		entry: mapEntries({
			main: [
			'./global.js',
			path.resolve(source, 'main.js')
			]
		}),
		output: {
			filename: 'js/[name].min.js',
			path: path.resolve(__dirname, output)
			//publicPath: '/assets/'
		},
		module: {
			rules: [
				{
					test: /\.styl$/,
					exclude: /node_modules/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [
							{ loader: 'css-loader', options: {sourceMap: isDev, importLoaders: 1 } },
							{ loader: 'postcss-loader', options: { sourceMap: isDev, config: { path: './postcss.config.js'} } },
							{ loader: 'stylus-loader' }
							// { loader: 'stylint-loader' }
						]
					})
				},
				{
					test: /\.(njk|nunjucks|html|tpl|tmpl)$/,
					use: [
					  {
						loader: 'nunjucks-isomorphic-loader',
						query: {
						  root: [
							  path.resolve(__dirname, 'src/html/')
							]
						}
					  }
					]
				  },
				{ 
					test: /.js$/,
					exclude: /node_modules/,
					use:[
						{ loader: 'eslint-loader', options: { emitError: true, emitWarning: true, failOnError: true } },
						{ loader: 'babel-loader', options: { presets: ['es2015'] } }

					],
				},
				{
					test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
					use: [
						{
						loader: 'file-loader',
						options: {
							limit: 50000,
							mimetype: 'application/font-woff',
							name: 'fonts/[name].[ext]',
						},
						}
					],
				},
				{
					test: /\.(jpe?g|png|gif|svg)$/i,
					use: [
						{
						  loader: 'url-loader',
						  options: {
							name: 'img/[name].[hash].[ext]',
						  },
						},
						{
						  loader: 'image-webpack-loader',
						  options: {
							pngquant: {
							  quality: '80-90',
							  speed: 1,
							},
						  },
						},
					],
				},
				{
					test: /\.(ico|icns)$/,
					use: [{loader: 'file-loader', options: {name: 'icons/[name].[ext]'}}]
				}
			],
		},
		resolve: {
			//files in these directory can be required without a relative path
			modules: ['node_modules'],

			//all these extensions will be resolved without specifying extension in the `require` function
			extensions: ['*', '.js', '.styl', '.njk'],

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
