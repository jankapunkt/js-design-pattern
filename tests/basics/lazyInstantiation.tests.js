/* eslint-env mocha */
import { assert } from 'chai'
import { createLazyInstantiable } from '../../src/basics/lazyInstantiation'

// import { notImplemented } from '../helpers.tests'

describe('basics/LazyInstantiation', function () {
  describe('createLazyInstantiable', function () {
    it('creates an uninstantiated object', function () {
      function Point ({ x, y }) {
        const scale = 100
        return {
          getScale () {
            return scale
          },
          getX () {
            return scale * x
          },
          getY () {
            return scale * y
          }
        }
      }

      const LazyPoint = createLazyInstantiable(Point, { x: 5, y: 10 })
      assert.isUndefined(LazyPoint.getScale)
      assert.isUndefined(LazyPoint.getX)
      assert.isUndefined(LazyPoint.getY)
      assert.isDefined(LazyPoint.instance)

      const lazyPointInstance = LazyPoint.instance()
      assert.isUndefined(lazyPointInstance.scale)
      assert.isUndefined(lazyPointInstance.x)
      assert.isUndefined(lazyPointInstance.y)
      assert.equal(lazyPointInstance.getScale(), 100)
      assert.equal(lazyPointInstance.getX(), 500)
      assert.equal(lazyPointInstance.getY(), 1000)
    })
  })
})
