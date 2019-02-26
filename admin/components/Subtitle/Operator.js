import React from 'react'
import PropTypes from 'prop-types'

class Operator extends React.Component {
  render() {
    return (
      <div className="subtitle">
        <textarea autoComplete="off" value={this.props.text} onChange={this.props.onChange} />
        <button onClick={this.props.onClick}>Set</button>
      </div>
    )
  }
}

Operator.propTypes = {
  text: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func
}

Operator.defaultProps = {
  text: '',
  onChange: () => {},
  onClick: () => {}
}

export default Operator
