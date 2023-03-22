const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
  id: Schema.ObjectId,
  name: String,
  password: String,
  profile: String
})

const Model = mongoose.model('User', mySchema)

module.exports = Model
