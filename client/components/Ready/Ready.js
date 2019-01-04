import React from 'react'
import './ready.scss'

class Ready extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="wrapper">
        <div className="ready">- 準備中 -</div>
      </div>
    )
        // <div className="time">{this.state.time}</div>
  }
}

export default Ready
