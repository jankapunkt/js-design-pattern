import {chai, assert} from 'chai';

import {Room, MagicRoom, OrdinaryRoom, MagicMazeGame,OrdinaryMazeGame} from '../../src/creational/FactoryMethod';

describe("creational/FactoryMethod", function () {

	it("defers instantiation of members to subclasses", function () {
		const magicMazeGame = new MagicMazeGame();
		const enterMagicRoom = magicMazeGame.enterRoom(0);
		const magicRoom = new MagicRoom();

		const ordinaryMazeGame = new OrdinaryMazeGame();
		const enterOrdinaryRoom = ordinaryMazeGame.enterRoom(0);
		const orinaryRoom = new OrdinaryRoom();

		assert.equal(enterMagicRoom, magicRoom.onEnter());
		assert.equal(enterOrdinaryRoom, orinaryRoom.onEnter());
	});

});