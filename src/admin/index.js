import config from '../config'

var ws = new WebSocket(`ws://${config.websocket.host}:${config.websocket.port}/component`)
ws.onmessage = (e) => {
  const json = JSON.parse(e.data)
  console.log(json.component)
  console.log(JSON.parse(json.props))
}

document.addEventListener('DOMContentLoaded', () => {
  const input_msg = document.getElementById('input_msg')

  function setComponent(name, props = {}) {
    input_msg.value = `${name}|${JSON.stringify(props)}`
    document.getElementById('message_form').submit()
  }

  document.getElementById('empty').addEventListener('click', () => {
    setComponent('empty')
  })

  document.getElementById('ready').addEventListener('click', () => {
    let text = document.getElementById('input_ready_text').value
    console.log(text)
    if (text === '') text = '準備中'
    setComponent('ready', { text })
  })

  document.getElementById('message_form').addEventListener('submit', () => {
    ws.send(input_msg.value)
    input_msg.value = ''
    return false
  })
})
