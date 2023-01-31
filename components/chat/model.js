const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
  id: Schema.ObjectId,
  name: String,
  users: {
    type: [Schema.ObjectId],
    ref: 'User'
  },
  file: String,
  date: Date
})

const Model = mongoose.model('Chat', mySchema)

module.exports = Model
