import React from 'react'
import PropTypes from 'prop-types'

import './subtitle.scss'

class Subtitle extends React.Component {
  render () {
    const barClasses = ['subtitle-bar']
    const textClasses = ['subtitle-text']

    if (this.props.scroll) {
      textClasses.push('scroll')
      barClasses.push('black')
    }

    let text = this.props.scroll ? this.nl2sp(this.props.text) : this.nl2br(this.props.text)

    return (
      <div className='subtitle-wrapper'>
        <div className={barClasses.join(' ')}>
          <div className={textClasses.join(' ')}>{text}</div>
        </div>
      </div>
    )
  }

  nl2sp (str) {
    return str.split('\n').join('　')
  }

  nl2br (str) {
    const contents = []
    const lines = str.split('\n')

    for (let i = 0; i < lines.length; i++) {
      contents.push(lines[i])
      if (i !== lines.length - 1) contents.push(<br />)
    }

    return contents
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
  text: PropTypes.string,
  scroll: PropTypes.bool
}

Subtitle.defaultProps = {
  text: '',
  scroll: 'off'
}

export default Subtitle
