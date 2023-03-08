const express = require('express')
const multer = require('multer')
const path = require('path')

const response = require('../../network/response')
const controller = require('./controller')
const router = express.Router()

const config = require('../../config/config')

const storage = multer.diskStorage({
  destination: 'public/' + config.filesRoute + '/userProfile',
  filename: function (req, file, cb) {
    cb(null, file.originalname + path.extname(file.originalname))
  }
})

const upload = multer({
  storage
})

const app = express()
app.use(router)

router.get('/:id?', async (req, res) => {
  try {
    const userId = req.params.id || null

    const body = await controller.getUser(userId)

    await response.success(req, res, body, 200)
  } catch (error) {
    await response.error(req, res, 'Unexpected Error', 500)
    console.error(error)
  }
})

router.post('/', upload.single('myProfile'), async (req, res) => {
  try {
    const body = await controller.addUser(req.body.name, req.body.myProfile)

    await response.success(req, res, body, 201)
  } catch (error) {
    await response.error(req, res, 'Información invalida', 400, 'Error en el controlador: ' + error)
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const body = await controller.updateUser(req.params.id, req.body.name)

    await response.success(req, res, 'Usuario actualizado correctamente', body, 200)
  } catch (error) {
    await response.error(req, res, 'Información invalida', 400, 'Error en el controlador: ' + error)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await controller.deleteUser(req.params.id)

    await response.success(req, res, `Usuario ${req.params.id} `()` eliminado`, 200)
  } catch (error) {
    await response.error(req, res, 'Error interno', 500, 'Error en el controlador: ' + error)
  }
})

module.exports = router
