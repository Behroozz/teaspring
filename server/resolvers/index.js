const inventoryResolver = require('./inventory')
const questionResolver = require('./question')
const nearestResolver = require('./nearest')

module.exports = [
  inventoryResolver,
  questionResolver,
  nearestResolver
]