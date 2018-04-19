require('../Global')

//expands source for target apps and merge objects with give 'main'
module.exports = function mapEntries(main) {
	return Object.assign(glob.sync(source + '**/*.js').reduce(function(obj, file) {
		var name = path.basename(file, '.js');
		obj[ name ] = source + name + '/' +  name + '.js';
		return obj;
	}, {}), main)
}
