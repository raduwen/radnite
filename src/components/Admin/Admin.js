/* global WebSocket */

import React from 'react'

import config from '../../config'

class Admin extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      message: '',
      ready: '',
      subtitle: ''
    }

    this.ws = new WebSocket(`ws://${config.websocket.host}:${config.websocket.port}/component`)
    this.ws.onmessage = (e) => {
      const json = JSON.parse(e.data)
      console.log(json.component)
      console.log(JSON.parse(json.props))
    }

    this.setComponent = this.setComponent.bind(this)
    this.publishMessage = this.publishMessage.bind(this)
  }

  render () {
    return (
      <div>
        <form action="#" onSubmit={() => {
          this.publishMessage()
          return false
        }}>
          <input type="hidden" autoComplete="off" onChange={(e) => {
            this.setState({ message: e.currentTarget.value })
          }} />
          <div className="emtpy">
            <button onClick={() => {
              this.setComponent('empty')
            }}>Emtpy</button>
          </div>

          <hr />
          <div className="ready">
            <input type="text" autoComplete="on" onChange={(e) => {
              this.setState({ ready: e.currentTarget.value })
            }} />
            <button onClick={(e) => {
              let text = this.state.ready
              if (text === '') text = '準備中'
              this.setComponent('ready', { text })
            }}>Set(or Ready)</button>
            <button onClick={() => {
              this.setComponent('ready', { text: '終了しました' })
            }}>End</button>
          </div>

          <hr />
          <div className="subtitle">
            <textarea autoComplete="off" onChange={(e) => {
              this.setState({ subtitle: e.currentTarget.value })
            }} />
            <button onClick={() => {
              this.setComponent('subtitle', { text: this.state.subtitle })
            }}>Set</button>
          </div>
        </form>
      </div>
    )
  }

  setComponent (name, props = {}) {
    this.setState({ message: `${name}|${JSON.stringify(props)}` })
    this.publishMessage()
  }

  publishMessage () {
    if (this.messageIsValid()) this.ws.send(this.state.message)
  }

  messageIsValid() {
    const msg = this.state.message
    return !(
      msg === '' ||
      msg === null ||
      typeof msg === 'undefined'
    )
  }
}

export default Admin
