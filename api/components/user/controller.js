
const store = require('./store')
const config = require('../../config/config')

function addUser (myName, myPass, myProfile) {
  return new Promise((resolve, reject) => {
    if (!myName) {
      console.error('[messageController] No hay nombre')
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('Los datos son incorrectos')
    }

    let fileUrl = ''
    if (myProfile) {
      fileUrl = config.host + ':' + config.port + '/public/' + config.filesRoute + '/userProfile/' + myProfile
    }

    const newUser = {
      name: myName,
      password: myPass,
      profile: fileUrl
    }

    store.add(newUser).then(resolve(newUser))
  })
}

function findUserByName (name, password) {
  return new Promise((resolve, reject) => {
    resolve(store.findUsername(name, password))
  })
}

function findUserByNamePass (name, password) {
  return new Promise((resolve, reject) => {
    resolve(store.findUsernamePass(name, password))
  })
}

function getUser (userId) {
  return new Promise((resolve, reject) => {
    resolve(store.get(userId))
  })
}

function updateUser (id, name) {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject(new Error('Id invalido'))
    }

    if (!name) {
      reject(new Error('Nombre invalido'))
    }

    store.update(id, name).then(resolve())
  })
}

function deleteUser (id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject(new Error('Id invalido'))
    }

    store.remove(id)
      .then(resolve())
      .catch(() => {
        reject(new Error('No se encontro el usuario a eliminar'))
      })
  })
}

module.exports = {
  addUser,
  getUser,
  updateUser,
  deleteUser,
  findUserByName,
  findUserByNamePass
}
