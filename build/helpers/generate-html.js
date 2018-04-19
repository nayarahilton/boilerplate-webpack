(function() {
	function generateHTMLPlugins(templateDir, extension) {
		var templates = fs.readdirSync(path.resolve(__dirname, templateDir))
		return templates.map(item => {
			// Split names and extension
			const parts = item.split('.')
			const name = parts[0]
			return new HTMLWebpackPlugin({
				alwaysWriteToDisk: true,
				inject: false,
				filename: path.resolve(__dirname, `../dist/${name}.html`),
				template: path.resolve(__dirname, `${templateDir}/${name}/${name}.${extension}`)
			})
		})
	}
	module.exports = generateHTMLPlugins;
})();



//To accomplish our task we will write a simple function to read the files from our views directory and generate an array of HTMLWebpackPlugins.
