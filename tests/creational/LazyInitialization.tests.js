/* eslint-env mocha */
import { assert } from 'chai'
import Fruit from '../../src/creational/LazyInitialization'

describe('creational/LazyInitialization', function () {
  it('is initially empty', function () {
    assert.equal(Fruit.size(), 0)
  })

  it('instantiates a type at first access', function (done) {
    const intialSize = Fruit.size()
    const type = 'Apple'
    Fruit.getFruit(type, function (err, res) {
      if (err) {
        done(err)
      } else {
        assert.equal(res.which(), type)
        assert.equal(Fruit.size(), intialSize + 1)
        done()
      }
    })
  })

  it('immediately returns an already created type', function (done) {
    const intialSize = Fruit.size()
    const type = 'Mango'
    Fruit.getFruit(type, function (err, res) {
      if (err) {
        return done(err)
      }
      const mango = res
      assert.equal(mango.which(), type)
      assert.equal(Fruit.size(), intialSize + 1)

      Fruit.getFruit(type, function (err, res) {
        if (err) {
          done(err)
        } else {
          assert.deepEqual(mango, res)
          assert.equal(Fruit.size(), intialSize + 1)
          done()
        }
      })
    })
  })
})
