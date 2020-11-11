const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const MemberLeftSchema = mongoose.Schema({
  _id: reqString,
  channelId: reqString,
})

module.exports = mongoose.model('Member Left Channels', MemberLeftSchema)