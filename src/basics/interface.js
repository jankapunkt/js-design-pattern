export const Implements = function (fct, ...ifacesArgs) {
  return function (...fctArgs) {
    let i, j, k // we use classic vars for indexing and immediate error throwing

    // let's go through all runtime args of this function
    for (i = 0; i < fctArgs.length; i++) {
      // get all interfaces for the current arg position
      // and skip if none have been declared for this position
      const interfaces = ifacesArgs[ i ]
      if (!interfaces || interfaces.length === 0) continue

      // go through all interfaces for the current arg
      const fctArg = fctArgs[ i ]
      for (j = 0; j < interfaces.length; j++) {
        const iface = interfaces[ j ]
        const ifaceKeys = Object.keys(iface)

        // check if all keys of the interface exist in the arg
        // and also check if their values comply with the given type
        for (k = 0; k < ifaceKeys.length; k++) {
          const key = ifaceKeys[ k ]
          const argValue = fctArg[ key ]
          if (argValue === null || typeof argValue === 'undefined') {
            throw new Error(`expected to implement [${key}] in argument at position ${i}`)
          }
          const instanceValue = iface[ key ]
          // the first check is fast and applies for most primitives, while the second
          // check is more expensive but traverses the whole prototype chain
          if (argValue.constructor !== instanceValue && !(argValue instanceof instanceValue)) {
            throw new Error(`expected [${key}] to be instance of [${instanceValue}] but got [${argValue.constructor}]`)
          }
        }
      }
    }
    return fct.call(this, ...fctArgs)
  }
}
