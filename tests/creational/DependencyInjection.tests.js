/* eslint-env mocha */
import { assert } from 'chai'
import {
  ServiceWithConstructorInjection,
  ServiceWithSetterInjection,
  ServiceWithInterfaceInjection
} from '../../src/creational/DependencyInjection'

describe('creational/DependencyInjection', function () {
  it('constructor injection', function () {
    const context = 'http://domain.tld'
    const serviceInstance = new ServiceWithConstructorInjection({
      getContext: function () {
        return context
      }
    })

    assert.equal(serviceInstance.execute(), context)
  })

  it('setter injection', function () {
    const setterServiceInstance = new ServiceWithSetterInjection()
    const context = 'http://domain.tld'

    assert.throws(function () {
      setterServiceInstance.execute()
    })

    setterServiceInstance.setContextProvider({
      getContext () {
        return context
      }
    })
    assert.equal(setterServiceInstance.execute(), context)

    const otherContext = 'http://subdomain.domain.tld'
    setterServiceInstance.setContextProvider({
      getContext () {
        return otherContext
      }
    })
    assert.equal(setterServiceInstance.execute(), otherContext)
    assert.notEqual(setterServiceInstance.execute(), context)
  })

  it('interface injection', function () {
    const context = 'http://domain.tld'
    const serviceInstance = new ServiceWithInterfaceInjection()
    assert.isDefined(serviceInstance.setContextProvider.interfaces)

    serviceInstance.setContextProvider({
      getContext: function () {
        return context
      }
    })

    assert.equal(serviceInstance.execute(), context)
    assert.throws(function () {
      new ServiceWithInterfaceInjection().setContextProvider()
    })
    assert.throws(function () {
      new ServiceWithInterfaceInjection().setContextProvider({ getContext: 1 })
    })
  })
})
