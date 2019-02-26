import React from 'react'
import PropTypes from 'prop-types'

import './subtitle.scss'

class Subtitle extends React.Component {
  render () {
    const text = this.nl2sp(this.props.text)
    return (
      <div className='subtitle-wrapper'>
        <div className='subtitle-bar'>
          <div className='subtitle-text'>{text}</div>
        </div>
      </div>
    )
  }

  nl2sp (str) {
    return str.split('\n').join('　')
  }

  /**
   * 一旦使わない
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
  */
}

Subtitle.propTypes = {
  text: PropTypes.string
}

Subtitle.defaultProps = {
  text: ''
}

export default Subtitle
