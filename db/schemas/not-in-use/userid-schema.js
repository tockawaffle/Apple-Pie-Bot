//Not in use, will not insert into database.

const mongoose = require('mongoose')

const userIdSchema = mongoose.Schema({
  // The user ID
  _id: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('users-ids', userIdSchema)