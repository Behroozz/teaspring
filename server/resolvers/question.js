const axios = require('axios')
const { get } = require('lodash')
const { getHeaders } = require('../helpers/ApiHelpers')

module.exports = {
  Query: {
    questions: async (parent, _, { }) => {
      try {
        const URI =  process.env.QUESTION_PRACTICE_ENDPOINT_TEMP
        const headers =  getHeaders(process.env.QUESTION_PRACTICE_AUTH_TOKEN)
        const questions = await axios.get(URI, headers)
        return get(questions, 'data')
      } catch (ex) {
        console.log(ex)
        throw ex
      }
    }
  },
}
