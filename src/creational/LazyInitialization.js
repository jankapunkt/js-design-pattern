

class Fruit {

	constructor(type) {
		this.type = type;
	}

	which() {
		return this.type;
	}

	static getFruit(type, callback) {
		// we use a callback, because
		// we assume, that this init
		// is a very expensive operation
		if (typeof Fruit.types[type] == 'undefined') {
			Fruit.types[type] = new Fruit(type);
		}
		callback(null, this.types[type]);
	}

	static size() {
		return Object.keys(Fruit.types).length;
	}
};

// assign 'static' member
Fruit.types = {};

export default Fruit;