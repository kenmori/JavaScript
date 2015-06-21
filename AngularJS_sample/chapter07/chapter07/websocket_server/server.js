var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 8181 });

wss.on('connection', function connection(ws) {
  var n = 0;
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send(message);
  });
});
