import React from 'react'
import PropTypes from 'prop-types'

import './ready.scss'

class Ready extends React.Component {
  render() {
    return (
      <div id="ready-component">
        <div className="ready">- {this.props.text} -</div>
      </div>
    )
    // <div className="time">{this.state.time}</div>
  }
}

Ready.propTypes = {
  text: PropTypes.string
}

Ready.defaultProps = {
  text: '準備中'
}

export default Ready
