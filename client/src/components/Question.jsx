import React from 'react'
import { useQuery } from '@apollo/react-hooks/lib'
import { get } from 'lodash'

import ColorNearGroup from './ColorNearGroup'
import GET_QUESTIONS_QUERY from '../actions/Questions'

const Layer = ({ layers, title }) => {
  return (
    <ColorNearGroup
      group={layers}
      title={title}
      nearest={true}
    />
  )
}

function Question() {
  const { loading, error, data } = useQuery(GET_QUESTIONS_QUERY)
  if (error) return <h1>Something went wrong!</h1>
  if (loading) return <div />

  const questionsResponse = get(data, 'questions')
  const scenario_id = get(questionsResponse, 'scenario_id')
  const questions = get(questionsResponse, 'questions')

  return (
    <div>
      <h2 style={{ textAlign: "left", paddingLeft: "1.7em" }}>{"Questions"}</h2>
      <h4 style={{ textAlign: "left", paddingLeft: "2.7em" }}>{scenario_id}</h4>
      {questions.map((question, index) =>
        <Layer
          key={index}
          layers={get(question, 'layers')}
          title={`Layer ${index}`}
        />)}
    </div>
  )
}

export default Question