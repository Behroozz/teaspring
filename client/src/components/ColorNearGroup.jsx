import React from 'react'
import { get } from 'lodash'
import Color from './Color'
import Nearest from './Nearest'

const colorContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 175px))',
  gridGap: '20px',
  marginBottom: '40px',
  listStyleType: 'none',
}

const ColorNearGroup = ({ group, title }) => {
  return (
    <div>
      <h3 style={{ textAlign: "left", paddingLeft: "2.5em" }}>{title}</h3>
      <ul style={colorContainerStyle}>
        {group.map(color => {
          return (
            <div key={get(color, 'color')}>
              <Color color={color} key={color} />
              <Nearest layerColor={color} />
            </div>
          )
        })}
      </ul>
    </div>
  )
}

export default ColorNearGroup
