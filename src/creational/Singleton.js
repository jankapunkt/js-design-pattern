
// add Settings to
// global namespace
global.Settings = {

  _instance: null,

  instance () {
    if (this._instance === null) {
      this._instance = {

        settingA: 'foo',
        settingB: 'bar'

      }
    }

    return this._instance
  }
}

// make sure no one can alter the
// Settings object
Object.defineProperty(global, 'Settings', { configurable: false, writable: false })
