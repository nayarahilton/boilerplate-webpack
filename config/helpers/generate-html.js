const fs = require('fs');
const path = require('path');
const glob = require('glob');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = function generateHTMLPlugins (templateDir, extension) {
	const templates = fs.readdirSync(path.resolve(__dirname, templateDir))
	return templates.map(item => {
		// Split names and extension
		const parts = item.split('.')
		const name = parts[0]
		return new HTMLWebpackPlugin({
			alwaysWriteToDisk: true,
			inject: false,
			filename: path.join(__dirname, `../../dist/${name}.html`),
			template: path.resolve(__dirname, `${templateDir}/${name}/${name}.${extension}`)
		})
	})
}
 //To accomplish our task we will write a simple function to read the files from our views directory and generate an array of HTMLWebpackPlugins.
