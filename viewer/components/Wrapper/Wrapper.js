import React from 'react'
import PropTypes from 'prop-types'

import './wrapper.scss'

class Base extends React.Component {
  render () {
    return (
      <div className="wrapper">{this.props.children}</div>
    )
  }
}

Base.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ])
}

Base.defaultProps = {
  children: []
}

export default Base
