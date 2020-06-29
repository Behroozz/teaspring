const gql = require('graphql-tag')
const mongoose = require('mongoose')
const { server } = require('../../app')
const { startTestServer, toPromise } = require('../../helpers/testUtils')

const POST_ANSWER = gql`
  mutation postingAnswer {
	postAnswers(scenario_id: "ade831c4-dd44-4205-b21b-1ac5304ebf75") {
		scenario_id
    answers {
      inks 
    }
  }
}
`

describe('Server - e2e', () => {
  let stop, graphql

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/teaspring', { useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
    })
  })

  beforeEach(async () => {
    const testServer = await startTestServer(server)
    stop = testServer.stop
    graphql = testServer.graphql
  })

  afterEach(() => stop())

  it('Get list of answers', async () => {
    const res = await toPromise(
      graphql({
        query: POST_ANSWER,
        variables: {},
      }),
    )

    expect(res).toMatchSnapshot()
    expect(1).toEqual(1)
  })
})
