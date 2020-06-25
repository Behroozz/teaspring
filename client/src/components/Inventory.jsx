import React from 'react'
import { useQuery } from '@apollo/react-hooks/lib'
import { get } from 'lodash'

import ColorGroup from './ColorGroup'
import GET_INVENTORY_QUERY from '../actions/Inventory'

function Inventory() {
  const { loading, error, data } = useQuery(GET_INVENTORY_QUERY)

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