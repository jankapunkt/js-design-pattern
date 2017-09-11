//////////////////////////////////////////////////////////////////
// EXAMPLE WITHOUT DIRECTOR
//////////////////////////////////////////////////////////////////

// makes it easier to
// build cars based on
// type categories
export const CarTypes = {
	TYPE_SPORTS_CAR: "sportscar",
	TYPE_SUV: "suv",
	TYPE_CITY_CAR: "citycar",
};

// makes it easier
// to have engines
// woth categories
export const FueldTypes = {
	GAS: "gas",
	DIESEL: "diesel",
}


// allows to build an
// engine for cars
export const EngineBuilder = {

	_product: {},

	clear() {
		this._product = {}
		return this;
	},

	build(seal = false) {
		if (seal) {
			const copy = Object.assign({}, this._product);
			return Object.seal(copy);
		}
		return this._product;
	},

	setPower(p) {
		this._product.power = p;
		return this;
	},

	setFuelType(t) {
		this._product.fuelType = t;
		return this;
	}
};

// allows to build
// types of cars.
export const CarBuilder = {

	_product: {},

	clear() {
		this._product = {}
		return this;
	},

	build() {
		return this._product;
	},

	setType(t) {
		this._product.type = t;
		return this;
	},

	setWheelSize(size) {
		this._product.wheelSize = size;
		return this;
	},

	setEngine(e) {
		this._product.engine = e;
		return this;
	},

	addDrive() {
		this._product.driveAction = "WRRRROOOOOOOOOOMMM!!!!!";
		this._product.drive = function () {
			if (!this.engine)
				throw new Error("Can't drive without engine");
			return this.driveAction;
		}.bind(this._product);
		return this;
	}
};




//////////////////////////////////////////////////////////////////
// EXAMPLE WITH DIRECTOR
//////////////////////////////////////////////////////////////////


// has a concrete plan
// about building cars
export const CarBuildDirector = {

	builder: CarBuilder,

	engines: EngineBuilder,

	construct(type) {

		this.builder.clear();
		this.engines.clear();

		let engine;

		switch (type) {
			case CarTypes.TYPE_SPORTS_CAR:
				engine = this.engines.setPower(300).setFuelType(FueldTypes.GAS);
				return this.builder.setEngine(engine).setType(type).setWheelSize(20).addDrive().build();
			case CarTypes.TYPE_CITY_CAR:
				engine = this.engines.setPower(110).setFuelType(FueldTypes.GAS);
				return this.builder.setEngine(engine).setType(type).setWheelSize(15).addDrive().build();
				break;
			case CarTypes.TYPE_SUV:
				engine = this.engines.setPower(270).setFuelType(FueldTypes.DIESEL);
				return this.builder.setEngine(engine).setType(type).setWheelSize(22).addDrive().build();
				break;
		}

		throw new Error("Could not direct car build. Unknown type: " + type);
	}
};

