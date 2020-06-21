import React from 'react'
import Color from './Color'

const colorContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 175px))',
  gridGap: '20px',
  marginBottom: '40px',
  listStyleType: 'none'
}

const nearestStyle = {
  float: 'right',
  width: 'max-content'
}

const ColorGroup = ({ group, title, type = '' }) => {
  const style = type === 'nearest' ? { ...nearestStyle, ...colorContainerStyle } : colorContainerStyle
  return (
    <div>
      <h2 style={{ textAlign: "left", paddingLeft: "1.7em" }}>{title}</h2>
      <ul style={style}>
        {group.map((color, index) => {
          return <Color color={color} key={index} />;
        })}
      </ul>
    </div>
  )
}

export default ColorGroup
