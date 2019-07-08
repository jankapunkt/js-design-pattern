export const SimpleCalculator = function (initialNumber) {
  this.value = initialNumber || 0
}

SimpleCalculator.prototype.add = function (n) {
  this.value += n
  return this
}

SimpleCalculator.prototype.sub = function (n) {
  this.value -= n
  return this
}

SimpleCalculator.prototype.mul = function (n) {
  this.value *= n
  return this
}

SimpleCalculator.prototype.div = function (n) {
  this.value /= n
  return this
}

SimpleCalculator.prototype.clear = function () {
  this.value = 0
  return this
}

SimpleCalculator.prototype.result = function () {
  return this.value
}
