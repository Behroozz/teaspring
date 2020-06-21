const { gql } = require('apollo-server')

module.exports = gql`
  input nearestInput {
    color: String!
    volume: Float!
    limit: Int
  }

  extend type Mutation {
    calculateNearestColors(
      color: String!
      volume: Float!
      limit: Int
    ): Nearest
  }

  type Nearest {
    nearest: [Near]
  }

  type Near {
    red: Int!
    green: Int!
    blue: Int!
    a: Int!
    id: String!
    color: String!
    cost: Float!,
    threeDDistance: Float!,
    twoDDistance: Float!,
    volumeCost: Float!
  }
`
