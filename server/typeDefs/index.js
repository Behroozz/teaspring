const { gql } = require('apollo-server')
const inventoryTypeDefs = require('./inventory')
const questionTypeDefs = require('./question')
const nearestTypeDefs = require('./nearest')

// Schema Stitching with extend
// _:String is only place holder since we can not have empty
const typeDefs = gql`
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
  type Subscription {
    _: String
  }
`

module.exports = [
  typeDefs,
  inventoryTypeDefs,
  questionTypeDefs,
  nearestTypeDefs
]
