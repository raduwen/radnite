import React from 'react'
import PropTypes from 'prop-types'

class Operator extends React.Component {
  render () {
    return (
      <div className="ready">
        <input type="text" autoComplete="on" onChange={this.props.onChange} value={this.props.text} />
        <button onClick={this.props.onSetClick}>Set(or Ready)</button>
        <button onClick={this.props.onEndClick}>End</button>
      </div>
    )
  }
}

Operator.propTypes = {
  text: PropTypes.string,
  onChange: PropTypes.func,
  onSetClick: PropTypes.func,
  onEndClick: PropTypes.func
}

Operator.defaultProps = {
  text: '',
  onChange: () => {},
  onSetClick: () => {},
  onEndClick: () => {}
}

export default Operator
