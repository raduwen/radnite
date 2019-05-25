import React from 'react'
import PropTypes from 'prop-types'

class Operator extends React.Component {
  render() {
    return (
      <div className="subtitle">
        <label>scroll <input name="scroll" type="checkbox" onChange={this.props.onChange} checked={this.props.scroll} /></label>
        <textarea name="text" autoComplete="off" value={this.props.text} onChange={this.props.onChange} />
        <button onClick={this.props.onClick}>Set</button>
      </div>
    )
  }
}

Operator.propTypes = {
  text: PropTypes.string,
  scroll: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func
}

Operator.defaultProps = {
  text: '',
  scroll: false,
  onChange: () => {},
  onClick: () => {}
}

export default Operator
