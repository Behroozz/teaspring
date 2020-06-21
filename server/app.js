const { ApolloServer } = require('apollo-server')
const dotEnv = require('dotenv')
// const axios = require('axios')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const { connection } = require('./database/db')

// const resolvers = {
//     Query: {
//         query: async () => {
//             try {
//                 const response = await axios.get('url')
//             } catch (error) {
//                 throw error
//             }
//         },
//     },
// }

dotEnv.config()
connection()

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => console.log(`Server ready at ${url}`))
