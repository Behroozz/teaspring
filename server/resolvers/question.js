const { get } = require('lodash')
const mockData = require('../mocks/mockData')

module.exports = {
  Query: {
    questions: async (parent, _, { }) => {
      try {
        return Promise.resolve(get(mockData, 'questions'))
      } catch (ex) {
        console.log(ex)
        throw ex
      }
    }
  },
}
