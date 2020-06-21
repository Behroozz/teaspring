import React from 'react'
import { useQuery } from '@apollo/react-hooks/lib'
import gql from 'graphql-tag'
import { get } from 'lodash'

import ColorGroup from './ColorGroup'

const GET_INVENTORY = gql`
    {
        inventory {
            inks {
                id
                color
                cost
            }
        }
    }
`

function Inventory() {
  const { loading, error, data } = useQuery(GET_INVENTORY)
  if (error) return <h1>Something went wrong!</h1>
  if (loading) return <h1>Loading...</h1>

  return (
    <div>
      <h1> {'Teaspring'} </h1>
      <ColorGroup
        group={get(data, 'inventory.inks')}
        title='Inventory of Inks'
      />
    </div>
  )
}

export default Inventory