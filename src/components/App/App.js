/* global WebSocket */

import React from 'react'

import 'sanitize.css'
import './app.scss'

import Wrapper from '../Wrapper'
import Empty from '../Empty'
import Ready from '../Ready'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      component: <Empty />
    }
    this.components = {
      empty: Empty,
      ready: Ready
    }
  }

  componentDidMount () {
    const socket = new WebSocket('ws://localhost:7000/component')
    socket.onopen = () => { console.log('connected') }
    socket.onmessage = (e) => {
      const params = JSON.parse(e.data)
      this.changeComponent(params.component, JSON.parse(params.props))
    }
  }

  render () {
    return (
      <Wrapper>
        {this.state.component}
      </Wrapper>
    )
  }

  onReceiveMessage (msg) {
    console.log(msg)
  }

  changeComponent (name, props) {
    const ComponentClass = this.components[name]
    if (ComponentClass) {
      this.setState({ component: (new ComponentClass(props || {})).render() })
    }
  }
}

export default App
