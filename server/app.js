var express = require('express');
var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 7000;

app.use(express.static(__dirname + '/public'));

app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (sock) => {
  sock.on('component', (command) => {
      const commands = command.split('|');
      const component = commands[0];
      let props = {}
      try {
          props = JSON.parse(commands[1]);
      } catch (e) {
          console.log(e);
      }
      console.log(component, props);
      io.emit('component', { component: component, props: props });
  });
});

http.listen(PORT, () => {
  console.log('server ListeningStateChangedEvent. Port:' + PORT);
});
