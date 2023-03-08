const Model = require('./model')

function addMessage (message) {
  const myMessage = new Model(message)
  myMessage.save()
}

function getMessages (filterMessages, fieldPopulate) {
  return new Promise((resolve, reject) => {
    let filter = {}

    if (filterMessages !== null) {
      fieldPopulate === 'chat'
        ? filter = { chat: filterMessages }
        : filter = { user: filterMessages }
    }

    Model.find(filter)
      .populate(fieldPopulate)
      .exec((error, populated) => {
        if (error) {
          reject(error)
          return false
        }

        resolve(populated)
      })
  })
}

async function updateText (id, message) {
  const foundMessage = await Model.findOne({
    _id: id
  })

  foundMessage.message = message
  const newMessage = await foundMessage.save()

  return newMessage
}

async function removeMessage (id) {
  return await Model.deleteOne({ _id: id })
}

module.exports = {
  add: addMessage,
  list: getMessages,
  updateText,
  remove: removeMessage
}
