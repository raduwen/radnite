import React from 'react'

import config from '../../config'
import 'sanitize.css'
import './preview.scss'
import Wrapper from '../Wrapper'
import Empty from '../Empty'
import Ready from '../Ready'
import Subtitle from '../Subtitle'

import * as firebase from 'firebase/app'
import 'firebase/database'

class Preview extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      component: <Empty />
    }
    this.components = {
      empty: Empty,
      ready: Ready,
      subtitle: Subtitle
    }
  }

  componentDidMount () {
    this.firebase = firebase.initializeApp(config.firebase)
    this.database = firebase.database()

    this.database.ref('test').on('value', (snap) => {
      const data = snap.val().split('|')
      const component = data[0]
      const props = JSON.parse(data[1])
      this.changeComponent(component, props)
    })
  }

  render () {
    return (
      <Wrapper>
        {this.state.component}
      </Wrapper>
    )
  }

  changeComponent (name, props) {
    const ComponentClass = this.components[name]
    if (ComponentClass) {
      this.setState({ component: (new ComponentClass(props || {})).render() })
    }
  }
}

export default Preview
