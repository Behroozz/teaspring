import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'

const colorStyle = {
  borderRadius: '5px',
  border: '1px solid lightgray',
  padding: '5px'
}
const headerStyle = {
  paddingBottom: '5px',
  paddingTop: '4px',
  fontWeight: 'bold',
  textTransform: 'capitalize'
}

const spanStyle = (color) => {
  let style = {}
  style['backgroundColor'] = color
  style['display'] = 'block'
  style['height'] = '4em'
  style['marginBottom'] = '0.3em'
  style['borderRadius'] = '5px'
  style['border'] = '1px solid lightgray'
  return style
}

const Color = ({ color }) => {
  return (
    <li style={colorStyle}>
      <span
        style={spanStyle(get(color, 'color'))}
      />
      < br />
      {get(color, 'color') && <span><span>{get(color, 'color')}</span> <br /></span>}
      {get(color, 'volume') && <div style={headerStyle}>{'volume:'}<br /></div>}
      {get(color, 'volume') && <span><span>{get(color, 'volume')}</span> <br /></span>}
      {get(color, 'cost') && <div style={headerStyle}>{'cost:'}<br /></div>}
      {get(color, 'cost') && <span><span>{get(color, 'cost')}</span> <br /></span>}
      {get(color, 'id') && <div style={headerStyle}>{'id:'}<br /></div>}
      {get(color, 'id') && <span><span>{get(color, 'id')}</span> <br /></span>}
      {get(color, 'threeDDistance') && <div style={headerStyle}>{'threeDDistance:'}<br /></div>}
      {get(color, 'threeDDistance') && <span><span>{get(color, 'threeDDistance')}</span> <br /></span>}
      {get(color, 'twoDDistance') && <div style={headerStyle}>{'twoDDistance:'}<br /></div>}
      {get(color, 'twoDDistance') && <span><span>{get(color, 'twoDDistance')}</span> <br /></span>}
      {get(color, 'volumeCost') && <div style={headerStyle}>{'volumeCost:'}<br /></div>}
      {get(color, 'volumeCost') && <span><span>{get(color, 'volumeCost')}</span> <br /></span>}
    </li >
  )
}
Color.propTypes = {
  color: PropTypes.object.isRequired
}

export default Color
