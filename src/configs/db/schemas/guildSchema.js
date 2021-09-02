const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const guildSchema = mongoose.Schema({
    _id: reqString,
    name: String,
    language: reqString,
    prefix: String,
    ivEnabled: Boolean,
    ivChannel: String
})

module.exports = mongoose.model('guilds', guildSchema)