/* global WebSocket */

import config from '../config'

var ws = new WebSocket(`ws://${config.websocket.host}:${config.websocket.port}/component`)
ws.onmessage = (e) => {
  const json = JSON.parse(e.data)
  console.log(json.component)
  console.log(JSON.parse(json.props))
}

document.addEventListener('DOMContentLoaded', () => {
  const inputMsg = document.getElementById('input_msg')

  function setComponent (name, props = {}) {
    inputMsg.value = `${name}|${JSON.stringify(props)}`
    document.getElementById('message_form').submit()
  }

  document.getElementById('empty').addEventListener('click', () => {
    setComponent('empty')
  })

  document.getElementById('ready').addEventListener('click', (e) => {
    let text = document.getElementById('input_ready_text').value
    if (text === '') text = '準備中'
    setComponent('ready', { text })
  })

  document.getElementById('end').addEventListener('click', () => {
    setComponent('ready', { text: '終了しました' })
  })

  document.getElementById('subtitle').addEventListener('click', () => {
    setComponent('subtitle', { text: document.getElementById('input_subtitle').value })
  })

  document.getElementById('message_form').addEventListener('submit', () => {
    ws.send(inputMsg.value)
    inputMsg.value = ''
    return false
  })
})
