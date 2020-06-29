const { ApolloServer } = require('apollo-server')
const dotEnv = require('dotenv')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const { connection } = require('./database/db')
const { batchedColorFetching } = require('./loaders/color')
const DataLoader = require('dataloader')

dotEnv.config()

if(process.env.NODE_ENV !== 'test') {
  connection()
}

const dataloader = new DataLoader(batchedColorFetching)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const contextObj = {}
    contextObj.loaders = dataloader
    return contextObj
  },
  // engine: {
  //   apiKey: process.env.APOLLO_KEY,
  //   reportSchema: true
  // }
})

server.listen().then(({ url }) => console.log(`Server ready at ${url}`))

module.exports.server = server
