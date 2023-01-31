
const store = require('./store')

function addUser (myName) {
  return new Promise((resolve, reject) => {
    if (!myName) {
      console.error('[messageController] No hay nombre')
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('Los datos son incorrectos')
    }

    const newUser = {
      name: myName
    }

    store.add(newUser).then(resolve(newUser))
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
  deleteUser
}
