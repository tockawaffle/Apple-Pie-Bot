const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const welcomeGSchema = mongoose.Schema({
  _id: reqString,
  channelId: reqString,
})

module.exports = mongoose.model('generic-welcome-guilds', welcomeGSchema)