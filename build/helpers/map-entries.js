function mapEntries(main) {
	return Object.assign(glob.sync(source + '**/*.js').reduce(function(obj, file) {
		var name = path.basename(file, '.js');
		obj[ name ] = './src/pages/' + name + '/' +  name + '.js';
		return obj;
	}, {}), main)
}

export default {mapEntries}



