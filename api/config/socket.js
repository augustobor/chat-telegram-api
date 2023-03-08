const socketIo = require('socket.io')

const socket = {}

function connect (server) {
  socketIo(server)
}

module.exports = {
  connect,
  socket
}
