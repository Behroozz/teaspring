import React, { useEffect, useCallback, useState, useRef } from 'react'
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import { get } from 'lodash'

import ColorGroup from './ColorGroup'

const buttonStyle = {
  backgroundColor: '#4CAF50',
  border: 'none',
  color: 'white',
  textDecoration: 'none',
  margin: '4px 2px',
  cursor: 'pointer',
  borderRadius: '5px',
  height: '2em',
  width: '100%',
  marginTop: '1em',
  padding: '1px',
}

const GET_NEAREST_COLORS = gql`
  mutation ($color: String!, $volume: Float!, $limit: Int) {
    calculateNearestColors(
      color: $color,
      volume: $volume,
      limit: $limit
    ) {
      nearest {
        red
        green
        blue
        a
        id
        color
        cost
        threeDDistance
        twoDDistance
        volumeCost
      }
    }
  }
`

function Nearest({ layerColor }) {
  const { color, volume } = layerColor
  const [getNearestColors, { loading, data }] = useMutation(GET_NEAREST_COLORS);
  const [isSending, setIsSending] = useState(false)

  const isMounted = useRef(true)
  // set isMounted to false when we unmount the component
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  const updateNearestColors = useCallback(async () => {
    // don't send again while we are sending or loading
    if (isSending && loading) return
    // update state
    setIsSending(true)
    getNearestColors({
      variables: {
        color: color,
        volume: volume,
        limit: 3
      }
    })
    // once the request is sent, update state again
    if (isMounted.current) // only update if we are still mounted
      setIsSending(false)
  }, [isSending]) // update the callback if the state changes

  const nearestColors = get(data, 'calculateNearestColors.nearest')

  return (
    <div>
      {/* <h1> {'Nearest'} </h1> */}
      <input
        type="button"
        style={buttonStyle}
        disabled={isSending}
        onClick={updateNearestColors}
        value={'Answer(s)'}
      />
      {nearestColors && <ColorGroup
        group={get(data, 'calculateNearestColors.nearest')}
        title=''
        type='nearest'
      />}
    </div>
  )
}

export default Nearest