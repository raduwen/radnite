/* global WebSocket */

import React from 'react'
// import PropTypes from 'prop-types'

import config from '../../config'

import EmptyOperator from '../Empty'
import SubtitleOperator from '../Subtitle'
import ReadyOperator from '../Ready'

class Admin extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      ready: '',
      subtitle: ''
    }

    this.ws = new WebSocket(`ws://${config.websocket.host}:${config.websocket.port}/component`)
    this.ws.onmessage = (e) => {
      const json = JSON.parse(e.data)
      const component = json.component
      const props = JSON.parse(json.props)
      if (component && props) {
        const state = {}
        // TODO: props自体を与えられるようにしたい
        state[json.component] = props.text || ''
        this.setState(state)
      }
    }

    this.setComponent = this.setComponent.bind(this)
    this.publishMessage = this.publishMessage.bind(this)
  }

  render () {
    return (
      <div>
        <form action='#' onSubmit={() => {
          this.publishMessage()
          return false
        }}>
          <EmptyOperator onClick={() => { this.setComponent('empty') }} />

          <hr />
          <ReadyOperator
            text={this.state.ready}
            onChange={(e) => {
              this.setState({ ready: e.currentTarget.value })
            }}
            onSetClick={(e) => {
              let text = this.state.ready
              if (text === '') text = '準備中'
              this.setComponent('ready', { text })
            }}
            onEndClick={() => {
              this.setComponent('ready', { text: '終了しました' })
            }}
            onClearClick={() => {
              this.setComponent('ready', { text: '' })
            }}
          />

          <hr />
          <SubtitleOperator
            text={this.state.subtitle}
            onChange={(e) => {
              this.setState({ subtitle: e.currentTarget.value })
            }}
            onClick={() => {
              this.setComponent('subtitle', { text: this.state.subtitle })
            }}
          />
        </form>
      </div>
    )
  }

  setComponent (name, props = {}) {
    const message = `${name}|${JSON.stringify(props)}`
    this.publishMessage(message)
  }

  publishMessage (message) {
    if (this.isValidMessage(message)) this.ws.send(message)
  }

  isValidMessage (message) {
    return !(
      message === '' ||
      message === null ||
      typeof message === 'undefined'
    )
  }
}

export default Admin
