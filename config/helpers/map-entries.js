const glob = require('glob');
const path = require('path');

const PACKAGE = require('../../package.json').config;
const source = PACKAGE.source;

//expands source for target apps and merge objects with give 'main'
module.exports = function mapEntries(main) {
	return Object.assign(glob.sync(source + '**/*.js').reduce(function(obj, file) {
		var name = path.basename(file, '.js');
		var fileName = source + name + '/' +  name;
		obj[ name ] = [fileName + '.js', fileName + '.styl',];
		return obj;
	}, {}), main)
}
