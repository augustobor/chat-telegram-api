const express = require('express')
const multer = require('multer')
const response = require('../../network/response')
const controller = require('./controller')
const router = express.Router()
const config = require('../../config/config')

const upload = multer({
  dest: 'public/' + config.filesRoute + '/'
})

const app = express()
app.use(router)

const filteredMessageResponse = async (req, res, fieldPopulate) => {
  try {
    const filterMessages = req.params.id || null
    const body = await controller.getMessages(filterMessages, fieldPopulate)

    return await response.success(req, res, body, 200)
  } catch (error) {
    console.error(error)
    return await response.error(req, res, 'Unexpected Error: ' + error, 500)
  }
}

router.get('/chatMessages/:id', async (req, res) => {
  return filteredMessageResponse(req, res, 'chat')
})

router.get('/userMessages/:id', async (req, res) => {
  return filteredMessageResponse(req, res, 'user')
})

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const body = await controller.addMessage(req.body.chat, req.body.user, req.body.message, req.body.file)

    await response.success(req, res, body, 200)
  } catch (error) {
    await response.error(req, res, 'Información invalida', 400, 'Error en el controlador: ' + error)
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const body = await controller.updateMessage(req.params.id, req.body.newMessage)

    await response.success(req, res, body, 200)
  } catch (error) {
    await response.error(req, res, 'Error interno', 500, 'Error en el controlador: ' + error)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await controller.deleteMessage(req.params.id)

    await response.success(req, res, `Mensaje ${req.params.id} eliminado`, 200)
  } catch (error) {
    await response.error(req, res, 'Error interno', 500, 'Error en el controlador: ' + error)
  }
})

module.exports = router
