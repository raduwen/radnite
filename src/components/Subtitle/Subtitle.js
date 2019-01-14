import React from 'react'
import PropTypes from 'prop-types'

import './subtitle.scss'

class Subtitle extends React.Component {
  render () {
    return (
      <div className='subtitle'>{this.props.text}</div>
    )
  }
}

Subtitle.propTypes = {
  text: PropTypes.string
}

Subtitle.defaultProps = {
  text: ''
}

export default Subtitle
