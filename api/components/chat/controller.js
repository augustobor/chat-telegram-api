const store = require('./store')
const config = require('../../config/config')

function addChat (name, users, file) {
  if (!users || !Array.isArray(users)) {
    return Promise.reject(new Error('Invalid user list'))
  }

  let fileUrl = ''
  if (file) {
    fileUrl = config.host + ':' + config.port + '/public/' + config.filesRoute + '/chatProfile/' + file
  }

  console.log(fileUrl)

  const date = new Date()
  const chat = { name, users, file: fileUrl, date }

  return store.add(chat)
}

function listChats (userId) {
  return store.list(userId)
}

function findChat (chatId) {
  return store.chat(chatId)
}

function removeChat (chatId) {
  return store.remove(chatId)
}

module.exports = {
  addChat,
  listChats,
  removeChat,
  findChat
}
