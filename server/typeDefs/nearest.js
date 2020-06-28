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
    postAnswers(
      scenario_id: String!
      limit: String
      method: String
    ): Answer
  }

  extend type Query {
    batchQuery(
      ids: [String],
      scenario_id: String!
    ): Answer
  }

  type Colors {
    color: [String]
  }

  type Nearest {
    nearest: [Near],
    kdTree: String
  }

  type Near {
    red: Int!
    green: Int!
    blue: Int!
    a: Int!
    id: String!
    color: String!
    cost: Float!,
    volume: Float!,
    threeDDistance: Float!,
    twoDDistance: Float!,
    volumeCost: Float!
  }
  type InkSelection {
    inks: [String!]
  }

  type Answer {
    scenario_id: String!
    answers: [InkSelection]
  }
`
