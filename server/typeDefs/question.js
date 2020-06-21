const { gql } = require('apollo-server')

module.exports = gql`
  extend type Query {
    questions: Question
  }

  type Question {
    scenario_id: String!
    questions: [Layers!]
  }

  type Layers {
    layers: [Layer!]
  }

  type Layer {
    color: String!  
    volume: Float!
  }
`
