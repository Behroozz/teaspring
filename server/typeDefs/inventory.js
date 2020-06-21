const { gql } = require('apollo-server')

module.exports = gql`
  extend type Query {
    inventory: Inventory
  }

  type Inventory {
    inks: [Ink!]
  }

  type Ink {
    id: String!
    color: String!
    cost: Float!
    createdAt: String
    updatedAt: String
  }
`
