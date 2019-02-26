import React from 'react'
import PropTypes from 'prop-types'

class Operator extends React.Component {
  render () {
    return (
      <div className="emtpy">
        <button onClick={this.props.onClick}>Emtpy</button>
      </div>
    )
  }
}

Operator.propTypes = {
  onClick: PropTypes.func
}
Operator.defaultProps = {
  onClick: () => {}
}

export default Operator
