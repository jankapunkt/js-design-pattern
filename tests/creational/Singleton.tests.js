/* eslint-env mocha */
import { assert } from 'chai'
import '../../src/creational/Singleton'

describe('creational/Singleton', function () {
  it('ensures that only one instance of the singleton class ever exists', function () {
    assert.isDefined(global.Settings)
    assert.isNotNull(global.Settings)

    assert.throws(function () {
      global.Settings = {}
    })

    assert.throws(function () {
      delete global.Settings
    })
  })

  it('provides global access to that instance', function () {
    const settings = global.Settings.instance()
    assert.equal(settings.settingA, 'foo')
    assert.equal(settings.settingB, 'bar')
  })
})
