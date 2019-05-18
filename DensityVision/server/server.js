const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8000 })

wss.on('connection', ws => {
  
  setInterval(() => {
    let coord = {
      x : Math.random(),
      y: Math.random()
    }
    ws.send(JSON.stringify(coord))
  }, 10);

})

