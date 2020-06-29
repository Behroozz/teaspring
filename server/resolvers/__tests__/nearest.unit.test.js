const { get } = require('lodash')
const mongoose = require('mongoose')
const resolvers = require('../index')

describe('[Mutation.postAnswers]', () => {  
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/teaspring', { useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
    })
  })

  it('returns current scenario-id in response', async () => {  
    const res = await resolvers[2].Mutation.postAnswers(
      null,
      { scenario_id: "ade831c4-dd44-4205-b21b-1ac5304ebf75" },
      {},
    )
    expect(get(res, 'scenario_id')).toEqual('ade831c4-dd44-4205-b21b-1ac5304ebf75')
  })
})  
