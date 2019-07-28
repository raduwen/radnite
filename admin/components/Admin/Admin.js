import React from 'react'
// import PropTypes from 'prop-types'

import config from '../../config'

import EmptyOperator from '../Empty'
import SubtitleOperator from '../Subtitle'
import ReadyOperator from '../Ready'

import * as firebase from 'firebase/app'
import 'firebase/database'

class Admin extends React.Component {
  constructor (props) {
    super(props)

    this.initialState = {
      ready: { text: '' },
      subtitle: { text: '', scorll: false }
    }

    this.state = this.initialState

    this.firebase = firebase.initializeApp(config.firebase)
    this.database = firebase.database()

    this.database.ref('test').on('value', (snap) => {
      const data = snap.val().split('|')
      const component = data[0]
      const props = JSON.parse(data[1])
      if (component && props) {
        const state = {}
        state[component] = props
        this.reset()
        this.setState(state)
      }
    })

    this.setComponent = this.setComponent.bind(this)
    this.publishMessage = this.publishMessage.bind(this)
  }

  reset () {
    this.setState(this.initialState)
  }

  render () {
    return (
      <form action='#' onSubmit={(e) => {
        e.preventDefault()
        this.publishMessage()
        return false
      }}>
        <EmptyOperator onClick={(e) => { this.setComponent('empty') }} />

        <hr />
        <ReadyOperator
          text={this.state.ready.text}
          onChange={(e) => {
            this.setState({ ready: { text: e.currentTarget.value } })
          }}
          onSetClick={(e) => {
            let text = this.state.ready.text
            if (text === '') text = '準備中'
            this.setComponent('ready', { text })
          }}
          onEndClick={(e) => {
            this.setComponent('ready', { text: '終了しました' })
          }}
          onClearClick={(e) => {
            this.setComponent('ready', { text: '' })
          }}
        />

        <hr />
        <SubtitleOperator
          text={this.state.subtitle.text}
          scroll={this.state.subtitle.scroll}
          onChange={(e) => {
            const val = this.state.subtitle
            if (e.currentTarget.type === 'checkbox') {
              val[e.currentTarget.name] = e.currentTarget.checked
            } else {
              val[e.currentTarget.name] = e.currentTarget.value
            }
            this.setState({ subtitle: val })
          }}
          onClick={(e) => {
            this.setComponent('subtitle', this.state.subtitle)
          }}
        />
      </form>
    )
  }

  setComponent (name, props = {}) {
    const message = `${name}|${JSON.stringify(props)}`
    this.publishMessage(message)
  }

  publishMessage (message) {
    if (this.isValidMessage(message)) this.database.ref('test').set(message)
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
