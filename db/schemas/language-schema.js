const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const langSchema = mongoose.Schema({
    //ID da Guilda
    _id: reqString,
    language: reqString,
})

module.exports = mongoose.model('languages', langSchema)