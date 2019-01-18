export class Room {
  constructor () {
    this.connections = []
  }

  connect (otherRoom) {
    this.connections.push(otherRoom)
  }

  onEnter () {
    throw new Error('abstract class')
  }
}

export class MagicRoom extends Room {
  onEnter () {
    return 'swoosh magic'
  }
}

export class OrdinaryRoom extends Room {
  onEnter () {
    return 'grey...'
  }
}

export class MazeGame {
  constructor () {
    this.rooms = []

    const room1 = this.makeRoom()
    const room2 = this.makeRoom()
    room1.connect(room2)
    this.rooms.push(room1)
    this.rooms.push(room2)
  }

  makeRoom () {
    throw new Error('abstract class.')
  }

  enterRoom (id = 0) {
    return this.rooms[id].onEnter()
  }
}

export class MagicMazeGame extends MazeGame {
  makeRoom () {
    return new MagicRoom()
  }
}

export class OrdinaryMazeGame extends MazeGame {
  makeRoom () {
    return new OrdinaryRoom()
  }
}
