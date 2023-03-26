const express = require('express')
const multer = require('multer')
const path = require('path')

const response = require('../../network/response')
const controller = require('./controller')
const router = express.Router()

const config = require('../../config/config')

const storage = multer.diskStorage({
  destination: 'public/' + config.filesRoute + '/chatProfile',
  filename: function (req, file, cb) {
    cb(null, file.originalname + path.extname(file.originalname))
  }
})

const upload = multer({
  storage
})

const app = express()
app.use(router)

router.post('/:userId', upload.single('chatProfile'), async (req, res) => {
  try {
    const usersId = [req.params.userId, req.body.addUsersId]
    const name = req.body.name
    const profile = req.body.chatProfile
    const body = await controller.addChat(name, usersId, profile)

    await response.success(req, res, body, 201)
  } catch (error) {
    await response.error(req, res, 'Unexpected Error: ' + error, 500)
    console.error(error)
  }
})

router.get('/findUsers/:userId', async (req, res) => {
  try {
    const body = await controller.listChats(req.params.userId)
    await response.success(req, res, body, 200)
  } catch (error) {
    await response.error(req, res, 'Internal Error', 400, 'Error en el controlador: ' + error)
  }
})

router.get('/findChat/:chatId', async (req, res) => {
  try {
    const body = await controller.findChat(req.params.chatId)
    await response.success(req, res, body, 200)
  } catch (error) {
    await response.error(req, res, 'Internal Error', 400, 'Error en el controlador: ' + error)
  }
})

router.delete('/:chatId', async (req, res) => {
  try {
    await controller.removeChat(req.params.chatId)

    await response.success(req, res, `chat ${req.params.chatId} eliminado correctamente`, 200)
  } catch (error) {
    await response.error(req, res, 'Internal Error', 400, 'Error en el controlador: ' + error)
  }
})

module.exports = router
