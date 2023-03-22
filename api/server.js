const express = require('express')
const db = require('./config/db.js')
const router = require('./network/routes')

const config = require('./config/config')

const cors = require('cors')

const app = express()
const server = require('http').Server(app)

db(config.dbUrl)

const bodyParser = require('body-parser')
const socket = require('./config/socket')

socket.connect(server)

app.use(bodyParser.json())
app.use(cors())

router(app)

server.listen(config.port, function () {
  console.log('La aplicación esta escuchando en ' + config.host + ':' + config.port)
})

console.log('La aplicación está escuchando en el puerto 3000')
