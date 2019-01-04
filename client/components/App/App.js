/* global io */

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
    const socket = io('http://localhost:7000')
    socket.on('message', (msg) => { this.onReceiveMessage(msg) })
    socket.on('component', (params) => {
      this.changeComponent(params.component, params.props)
    })
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
    const componentClass = this.components[name]
    if (componentClass) {
      this.setState({ component: (new componentClass(props || {})).render() })
    }
  }
}

export default App
