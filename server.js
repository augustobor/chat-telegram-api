const express = require('express')
// import express from 'express' //ES6
const db = require('./db.js')
const router = require('./network/routes')

const config = require('./config')

const app = express()
const server = require('http').Server(app)

db(config.dbUrl)

const bodyParser = require('body-parser')
const socket = require('./socket')

socket.connect(server)

app.use(bodyParser.json())
router(app)

server.listen(config.port, function () {
  console.log('La aplicación esta escuchando en ' + config.host + ':' + config.port)
})

console.log('La aplicación está escuchando en el puerto 3000')
