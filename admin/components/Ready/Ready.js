import React from 'react'
import PropTypes from 'prop-types'

import './ready.scss'

import Time from '../Time'

class Ready extends React.Component {
  render () {
    return (
      <div id='ready-component'>
        { this.isPresentText() ? <div className='ready'>- {this.props.text} -</div> : '' }
        <Time />
      </div>
    )
  }

  isPresentText () {
    return (
      typeof this.props.text !== 'undefined' &&
      this.props.text !== null &&
      this.props.text !== ''
    )
  }
}

Ready.propTypes = {
  text: PropTypes.string
}

Ready.defaultProps = {
  text: '準備中'
}

export default Ready
