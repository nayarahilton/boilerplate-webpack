console.log('HOME 2');

function importAll(r) {
	return r.keys().map(r);
  }
importAll(require.context('../../assets/images/', false, /\.(png|jpe?g|svg)$/));

