import React from 'react'
import PropTypes from 'prop-types'

import './subtitle.scss'

class Subtitle extends React.Component {
  render () {
    const children = this.nl2br(this.props.text)
    return <div className='subtitle'>{children}</div>
  }

  nl2br (str) {
    const result = []
    const lines = str.split('\n')
    for (let i in lines) {
      result.push(lines[i])
      if (parseInt(i) + 1 !== lines.length) {
        result.push(<br />)
      }
    }
    return result
  }
}

Subtitle.propTypes = {
  text: PropTypes.string
}

Subtitle.defaultProps = {
  text: ''
}

export default Subtitle
