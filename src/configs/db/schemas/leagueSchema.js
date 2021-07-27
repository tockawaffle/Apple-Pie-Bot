

const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const leagueSchema = mongoose.Schema({
    _id: reqString,
    leagueReg: reqString,
    leagueName: reqString,
    leaguePUUID: reqString,
    leagueEncSmId: reqString
})

module.exports = mongoose.model('League DB', leagueSchema)