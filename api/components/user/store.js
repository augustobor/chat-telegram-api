const Model = require('./model')

function addUser (user) {
  const myUser = new Model(user)
  return myUser.save()
}

async function getUsers (myUserId) {
  let filter = {}

  if (myUserId !== null) {
    filter = { _id: myUserId }
  }

  const users = await Model.find(filter)

  return users
}

async function findUser (myName, pass) {
  const filter = { name: myName, password: pass }
  const user = await Model.findOne(filter)
  return user
}

async function findByUsername (name) {
  const user = await Model.findOne({ name })
  return user
}

async function updateUser (id, newName) {
  return await Model.updateOne({
    _id: id,
    name: newName
  })
}

async function removeUser (id) {
  return await Model.deleteOne({ _id: id })
}

module.exports = {
  add: addUser,
  get: getUsers,
  update: updateUser,
  remove: removeUser,
  findUsernamePass: findUser,
  findUsername: findByUsername
}
