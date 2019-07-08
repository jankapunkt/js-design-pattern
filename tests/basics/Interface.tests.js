/* eslint-env mocha */
import { assert } from 'chai'
import { attachImplementsToFunction, Implements } from '../../src/basics/interface'

// import { notImplemented } from '../helpers.tests'

describe('basics/Interface', function () {
  describe('Interface', function () {
    afterEach(function () {
      if (Function.prototype.implements) {
        delete Function.prototype.implements
      }
    })

    it('has a link to the original interface dfinition', function () {
      const IPoint = { x: Number, y: Number }

      const acceptElement = Implements(function (element) {}, [ IPoint ])
      assert.isDefined(acceptElement.interfaces)
      assert.equal(acceptElement.interfaces[ 0 ][ 0 ], IPoint)
    })

    it('works with one interface for one parameter', function (done) {
      const IPoint = { x: Number, y: Number }

      const acceptElement = Implements(function (element) {
        const { x } = element
        const { y } = element
        assert.isDefined(x)
        assert.isDefined(y)
        done()
      }, [ IPoint ])

      const elmn = { x: 10, y: 5, width: 200, height: 300 }
      acceptElement(elmn)
    })

    it('throws if uncompliant with ne interface for one parameter', function (done) {
      const IPoint = { x: Number, y: Number }

      const acceptElement = Implements(function (element) {
        const { x } = element
        const { y } = element
        assert.isDefined(x)
        assert.isDefined(y)
        done(new Error('expected to throw'))
      }, [ IPoint ])

      assert.throws(function () {
        acceptElement({ width: 200, height: 300 })
      })
      assert.throws(function () {
        acceptElement({ x: 10, width: 200, height: 300 })
      })
      assert.throws(function () {
        acceptElement({ y: 10, width: 200, height: 300 })
      })
      assert.throws(function () {
        acceptElement({ x: 10, y: '10', width: 200, height: 300 })
      })
      assert.throws(function () {
        acceptElement({ y: 10, x: '10', width: 200, height: 300 })
      })
      done()
    })

    it('works with multiple interfaces for one parameter', function (done) {
      const IPoint = { x: Number, y: Number }
      const ISize = { width: Number, height: Number }

      const acceptElement = Implements(function (element) {
        const { x } = element
        const { y } = element
        const { width } = element
        const { height } = element
        assert.isDefined(x)
        assert.isDefined(y)
        assert.isDefined(width)
        assert.isDefined(height)
        done()
      }, [ IPoint, ISize ])

      const elmn = { x: 10, y: 5, width: 200, height: 300 }
      acceptElement(elmn)
    })

    it('works with multiple interfaces for multiple parameters', function (done) {
      const IPoint = { x: Number, y: Number }
      const ISize = { width: Number, height: Number }
      const IColor = { color: String }

      const acceptElement = Implements(function (element1, element2) {
        assert.isDefined(element1.x)
        assert.isDefined(element1.y)
        assert.isDefined(element1.width)
        assert.isDefined(element1.height)

        assert.isDefined(element2.x)
        assert.isDefined(element2.y)
        assert.isDefined(element2.color)
        done()
      }, [ IPoint, ISize ], [ IPoint, IColor ])

      acceptElement({ x: 10, y: 5, width: 200, height: 300 }, {
        x: 10,
        y: 5,
        width: 200,
        height: 300,
        color: '#FF00AA'
      })
    })

    it('can be attached as Function prototype', function () {
      attachImplementsToFunction()
      const IPoint = { x: Number, y: Number }

      function acceptElement (element) {
        const { x } = element
        const { y } = element
        assert.isDefined(x)
        assert.isDefined(y)
      }

      assert.isDefined(acceptElement.implements)

      acceptElement.implements([ IPoint ])
      acceptElement({ x: 10, y: 5, width: 200, height: 300 })

      assert.throws(function () {
        acceptElement.implements([ {} ])
      })

      assert.throws(function () {
        acceptElement()
      })
      assert.throws(function () {
        acceptElement('asdasd')
      })
      assert.throws(function () {
        acceptElement({ width: 200, height: 300 })
      })
    })
  })
})
