const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}
const reqNumber = {
    type: Number,
    required: true
}

const userSchema = mongoose.Schema({
    _userID: reqString,
    registered: reqString,
    steamID: String,
    //Economy
    botPayout: String,
    amountCoins: reqNumber,
    amountAlreadyPaid: Number,
    amountBetted: Number,
    // daily: reqNumber,
})

module.exports = mongoose.model('Users', userSchema)