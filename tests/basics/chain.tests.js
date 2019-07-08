/* eslint-env mocha */
import { assert } from 'chai'
import { SimpleCalculator } from '../../src/basics/chain'

describe('basics/chain', function () {
  describe('SimpleCalculator', function () {
    it('works chains its function calls until a result is requested', function () {
      const calc = new SimpleCalculator()
      const result = calc.add(42).sub(23).mul(7).div(2).result()
      assert.equal(result, 66.5)
    })
  })
})
