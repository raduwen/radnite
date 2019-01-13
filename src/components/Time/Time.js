import React from 'react'

class Time extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      time: this.date2hms(new Date())
    }
    this.intervalId = setInterval(() => { this.setState({ time: this.date2hms(new Date()) }) }, 1000)
  }

  render () {
    return (
      <div id='time-component'>{this.state.time}</div>
    )
  }

  // @private
  keta2 (num) {
    if (num < 10) {
      return `0${num}`
    } else {
      return `${num}`
    }
  }

  // @private
  date2hms (date) {
    return `${this.keta2(date.getHours())}:${this.keta2(date.getMinutes())}:${this.keta2(date.getSeconds())}`
  }

  componentWillUnmount () {
    console.log(this.intervalId)
    clearInterval(this.intervalId)
  }
}

export default Time
