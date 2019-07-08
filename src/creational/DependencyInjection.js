/// ///////////////////////////////////////////////////////////////
// CONSTRUCTOR INJECTION
/// ///////////////////////////////////////////////////////////////

import { Implements } from '../basics/interface'

export class ServiceWithConstructorInjection {
  constructor (contextProvider) {
    this.contextProvider = contextProvider
  }

  execute () {
    return this.contextProvider.getContext()
  }
}

/// ///////////////////////////////////////////////////////////////
// SETTER INJECTION
/// ///////////////////////////////////////////////////////////////

export class ServiceWithSetterInjection {
  setContextProvider (contextProvider) {
    this.contextProvider = contextProvider
  }

  execute () {
    return this.contextProvider.getContext()
  }
}

/// ///////////////////////////////////////////////////////////////
// INTERFACE INJECTION
/// ///////////////////////////////////////////////////////////////

const IContext = { getContext: Function }

export class ServiceWithInterfaceInjection {
  setContextProvider (contextProvider) {
    this.contextProvider = contextProvider
  }

  execute () {
    return this.contextProvider.getContext()
  }
}

const setContextProviderWithInterface = Implements(ServiceWithInterfaceInjection.prototype.setContextProvider, [ IContext ])
setContextProviderWithInterface.prototype = ServiceWithInterfaceInjection.prototype.setContextProvider.prototype
ServiceWithInterfaceInjection.prototype.setContextProvider = setContextProviderWithInterface
