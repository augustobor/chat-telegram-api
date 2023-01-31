const config = require('../../config')
const store = require('./store')

function addMessage (chat, user, message, file) {
  return new Promise((resolve, reject) => {
    if (!user || !message) {
      console.error('[messageController] No hay usuario o mensaje')
      return reject(new Error('Los datos son incorrectos'))
    }

    let fileUrl = ''
    if (file) {
      fileUrl = config.host + ':' + config.port + '/app/' + config.filesRoute + '/' + file
    }

    const fullMessage = {
      user,
      chat,
      message,
      file: fileUrl,
      date: new Date()
    }

    store.add(fullMessage)
    resolve(fullMessage)
  })
}

async function getMessages (filterMessages, fieldPopulate) {
  return await store.list(filterMessages, fieldPopulate)
}

function updateMessage (id, message) {
  return new Promise((resolve, reject) => {
    if (!id || !message) {
      reject(new Error('Invalid data'))
      return false
    }

    const result = store.updateText(id, message)

    resolve(result)
  })
}

function deleteMessage (id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject(new Error('Id invalido'))
    }

    store.remove(id)
      .then(resolve())
      .catch(e => {
        reject(e)
      })
  })
}

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage
}
