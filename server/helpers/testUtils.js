const fetch = require('node-fetch');
const typeDefs = require('../typeDefs')
const resolvers = require('../resolvers')
const { execute, toPromise } = require('apollo-link')
const { HttpLink } = require('apollo-link-http');

module.exports.toPromise = toPromise

const constructTestServer = ({ context = {} } = {}) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  })

  return { server }
}

module.exports.constructTestServer = constructTestServer

const startTestServer = async server => {
  const httpServer = await server.listen({ port: 0 })

  const link = new HttpLink({
    uri: `http://localhost:${httpServer.port}`,
    fetch
  })

  const executeOperation = ({ query, variables = {} }) =>
    execute(link, { query, variables })

  return {
    link,
    stop: () => httpServer.server.close(),
    graphql: executeOperation,
  }
}

module.exports.startTestServer = startTestServer
