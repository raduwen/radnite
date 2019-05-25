import React from 'react'
import PropTypes from 'prop-types'

class Operator extends React.Component {
  render() {
    return (
      <div className="subtitle">
        <div>
          <label>
            <input name="scroll" type="checkbox" onChange={this.props.onChange} checked={this.props.scroll} />
            Scroll
          </label>
        </div>
        <div>
          <textarea name="text" autoComplete="off" value={this.props.text} onChange={this.props.onChange} />
        </div>
        <div>
          <button onClick={this.props.onClick}>Set</button>
        </div>
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
