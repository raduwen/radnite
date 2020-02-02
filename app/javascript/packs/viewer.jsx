// require("@rails/ujs").start()
// require("turbolinks").start()
// require("@rails/activestorage").start()
// require("channels")

import React from 'react'
import ReactDOM from 'react-dom'

import TimeComponent from '../components/TimeComponent'

const Components = {
  TimeComponent
}

const TypeComponent = (props) => {
  const TypeComponent = Components[props.component.type]

  return (
    <TypeComponent {...props.component.props}/>
  )
}

const Viewer = (props) => {
  return (
  <div>
    {props.components.map((component, i) => {
      return <TypeComponent key={`type-component-${i}`} component={component} />
    })}
  </div>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  const render_target = document.getElementById('viewer')
  const room_components = JSON.parse(document.getElementById('room-components').innerHTML).components

  ReactDOM.render(
    <Viewer components={room_components}/>,
    render_target
  )
})
