const Model = require('./model')

function addChat (chat) {
  const myChat = new Model(chat)
  return myChat.save()
}

function listChats (userId) {
  return new Promise((resolve, reject) => {
    let filter = {}

    if (userId) {
      filter = { users: userId }
    }

    Model.find(filter)
      .populate('users')
      .exec((error, populated) => {
        if (error) {
          reject(error)
          return false
        }

        resolve(populated)
      })
  })
}
async function findOneChat (chatId) {
  return await Model.findOne({ _id: chatId })
}

async function removeChat (chatId) {
  if (!chatId) {
    return false
  }

  return await Model.deleteOne({ _id: chatId })
}

module.exports = {
  add: addChat,
  list: listChats,
  remove: removeChat,
  chat: findOneChat
}
