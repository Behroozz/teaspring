const axios = require('axios')
const { get } = require('lodash')
const { getHeaders } = require('../helpers/ApiHelpers')
const Question =  require('../database/models/question')

module.exports = {
  Query: {
    questions: async (parent, _, { }) => {
      try {
        const URI =  process.env.QUESTION_PRACTICE_ENDPOINT_TEMP
        const headers =  getHeaders(process.env.QUESTION_PRACTICE_AUTH_TOKEN)
        const questions = await axios.get(URI, headers)
        const result = get(questions, 'data')
        await Question.deleteMany()
        await Question.insertMany(result)
        return result
      } catch (ex) {
        console.log(ex)
        throw ex
      }
    }
  },
}
