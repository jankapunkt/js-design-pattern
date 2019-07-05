export const createLazyInstantiable = function (construction, ...defaultArgs) {
  const internal = {
    instance: null
  }

  const context = {}
  context.instance = function () {
    if (!internal.instance) {
      internal.instance = construction(...defaultArgs)
    }
    return internal.instance
  }

  return context
}
