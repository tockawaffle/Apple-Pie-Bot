const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const afkSchema = mongoose.Schema({
    _id: reqString,
    text: reqString,
    time: reqString
})

module.exports = mongoose.model('afkSchema', afkSchema)