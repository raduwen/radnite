/* global io */

import React from 'react'
import ReactDOM from 'react-dom'

import Empty from './components/Empty'
import Ready from './components/Ready'

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
      <div>{this.state.component}</div>
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

ReactDOM.render(<App />, document.getElementById('app'))
