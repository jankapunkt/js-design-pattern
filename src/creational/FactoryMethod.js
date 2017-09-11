export class Room {

	constructor() {
		this.connections = new Array();
	}

	connect(otherRoom) {
		this.connections.push(otherRoom);
	}

	onEnter() {
		throw new Error("abstract class");
	}
}

export class MagicRoom extends Room {

	constructor() {super();}

	onEnter() {
		return "swoosh magic";
	}
}

export class OrdinaryRoom extends Room {

	constructor() {super();}

	onEnter() {
		return "grey...";
	}
}

export class MazeGame {

	constructor() {
		this.rooms = new Array();

		const room1 = this.makeRoom();
		const room2 = this.makeRoom();
		room1.connect(room2);
		this.rooms.push(room1);
		this.rooms.push(room2);
	}

	makeRoom() {
		throw new Error("abstract class.")
	}

	enterRoom(id=0) {
		return this.rooms[id].onEnter();
	}
}

export class MagicMazeGame extends MazeGame {

	constructor() {
		super();
	}

	makeRoom() {
		return new MagicRoom();
	}
}


export class OrdinaryMazeGame extends MazeGame {

	constructor() {
		super();
	}

	makeRoom() {
		return new OrdinaryRoom();
	}
}
