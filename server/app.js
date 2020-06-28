const { ApolloServer } = require('apollo-server')
const dotEnv = require('dotenv')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const { connection } = require('./database/db')
const { batchedColorFetching } = require('./loaders/color')
const DataLoader = require('dataloader')
const loaders = require('./loaders')

dotEnv.config()
connection()

const dataloader = new DataLoader(batchedColorFetching)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const contextObj = {}
    contextObj.loaders = dataloader
    return contextObj
  }

})

server.listen().then(({ url }) => console.log(`Server ready at ${url}`))
