import {chai, assert} from 'chai';

import {CarBuildDirector, CarBuilder, CarTypes, EngineBuilder, FueldTypes} from '../../src/creational/Builder';

import {notImplemented} from '../helpers.tests';

describe("creational/Builder", function () {

	describe("EngineBuilder", function () {

		beforeEach(function () {
			EngineBuilder.clear();
		});

		it("clear", function () {
			const power = 309;
			assert.notEqual(EngineBuilder._product.power, power);
			EngineBuilder.setPower(power);
			assert.equal(EngineBuilder._product.power, power);
			EngineBuilder.clear();
			assert.notEqual(EngineBuilder._product.power, power);
		});

		it("setPower", function () {
			const power = 309;
			assert.notEqual(EngineBuilder._product.power, power);
			EngineBuilder.setPower(power);
			assert.equal(EngineBuilder._product.power, power);
		});

		it("build", function () {
			const power = 123123;
			const type = FueldTypes.GAS;

			const sportsengine = EngineBuilder.setPower(power).setFuelType(type).build();
			assert.equal(sportsengine.power, power);
			assert.equal(sportsengine.fuelType, type);
		});
	});

	describe("CarBuilder", function () {


		beforeEach(function () {
			CarBuilder.clear();
		});

		it("clear", function () {
			const size = 213213;
			CarBuilder.setWheelSize(size);
			assert.equal(CarBuilder._product.wheelSize, size);
			CarBuilder.clear();
			assert.notEqual(CarBuilder._product.wheelSize, size);
		});

		it("setWheelSize", function () {
			const size = 213213;
			assert.notEqual(CarBuilder._product.wheelSize, size);
			CarBuilder.setWheelSize(size);
			assert.equal(CarBuilder._product.wheelSize, size);
		});

		it("setType", function () {
			const type = CarTypes.TYPE_CITY_CAR;
			assert.notEqual(CarBuilder._product.type, type);
			CarBuilder.setType(type);
			assert.equal(CarBuilder._product.type, type);
		});

		it("setEngine", function () {
			const engine = {};
			assert.notEqual(CarBuilder._product.engine, engine);
			CarBuilder.setEngine(engine);
			assert.equal(CarBuilder._product.engine, engine);
		});

		it("addDrive", function () {
			assert.isUndefined(CarBuilder._product.drive);
			assert.isUndefined(CarBuilder._product.driveAction);
			CarBuilder.addDrive();
			const driveResult = CarBuilder.build();

			assert.throws(function () {
				driveResult.drive();
			});

			CarBuilder.setEngine(EngineBuilder.clear().build());
			const withEngine = CarBuilder.build();
			assert.equal(withEngine.drive(), withEngine.driveAction);
		});

		it("build", function () {

			const power = 415;
			const fuelType = FueldTypes.GAS;
			const wheelSize = 22;
			const carType = CarTypes.TYPE_SPORTS_CAR;

			const sportsengine = EngineBuilder.clear().setPower(power).setFuelType(fuelType).build();
			const sportScar = CarBuilder.clear().setType(carType).setWheelSize(wheelSize).setEngine(sportsengine).addDrive().build();

			assert.equal(sportScar.engine.power, power);
			assert.equal(sportScar.engine.fuelType, fuelType);
			assert.equal(sportScar.wheelSize, wheelSize);
			assert.equal(sportScar.type, carType);
		});
	});


	describe("CarBuildDirector", function () {

		it ("construct known type", function () {
			const suvCar = CarBuildDirector.construct(CarTypes.TYPE_SUV);
			assert.equal(suvCar.drive(), suvCar.driveAction);
		});

		it ("throws on unknown type", function () {
			assert.throws(function () {
				CarBuildDirector.construct("some random type");
			});
		});
	});
});

