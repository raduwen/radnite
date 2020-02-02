import React from 'react'

import './time_component.scss'

class TimeComponent extends React.Component {
  constructor(props) {
    super(props)
    this.style = this.calc_style()
    this.state = { now: new Date() }
  }

  render() {
    const time_text = this.time_to_str(this.state.now)

    return (
      <div className="time component" style={this.style}>{time_text}</div>
    )
  }

  componentDidMount() {
    this.interval_id = setInterval(() => { 
      this.setState({ now: new Date() })
    }, 500)
  }

  componentWillUnmount() {
    clearInterval(this.interval_id)
  }

  //-------

  time_to_str(time) {
    const hours = this.zero_fill(time.getHours())
    const minutes = this.zero_fill(time.getMinutes())
    const seconds = this.zero_fill(time.getSeconds())

    return `${hours}:${minutes}:${seconds}`
  }

  zero_fill(num, size = 2) {
    return `0${num}`.slice(-1 * size)
  }

  calc_style() {
    const style = {
      color: this.props.text_color,
      fontSize: this.props.text_size,
      textShadow: [
        `${this.props.edge_size}px ${this.props.edge_size}px 0 ${this.props.edge_color}`,
        `-${this.props.edge_size}px -${this.props.edge_size}px 0 ${this.props.edge_color}`,
        `-${this.props.edge_size}px ${this.props.edge_size}px 0 ${this.props.edge_color}`,
        `${this.props.edge_size}px -${this.props.edge_size}px 0 ${this.props.edge_color}`,
        `0px ${this.props.edge_size}px 0 ${this.props.edge_color}`,
        `-${this.props.edge_size}px 0px 0 ${this.props.edge_color}`,
        `-${this.props.edge_size}px 0px 0 ${this.props.edge_color}`,
        `${this.props.edge_size}px 0px 0 ${this.props.edge_color}`
      ]
    }
    switch (this.props.position) {
      case 'left_bottom':
        style.left = this.props.text_size / 4
        style.bottom = 0
        break
      case 'right_top':
        style.right = this.props.text_size / 4
        style.top = 0
        break
      case 'left_top':
        style.left = this.props.text_size / 4
        style.top = 0
        break
      case 'right_bottom':
      default:
        style.right = this.props.text_size / 4
        style.bottom = 0
        break
    }

    return style
  }
}

TimeComponent.defaultProps = {
  text_size: 32,
  text_color: 'white',
  edge_size: 1,
  edge_color: 'black',
  position: 'right_bottom'
}

export default TimeComponent
