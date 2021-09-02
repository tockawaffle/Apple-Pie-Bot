const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const reqNumber = {
    type: Number,
    required: true
}

const inviteSchema = mongoose.Schema({
    id: reqString, //Guild ID
    inviterId: reqString,//Id do usuário que convidou nessa guilda,
    inviterNumber: reqNumber,
    confirmedInvs: Number,
    invitedId: String,
    invitedBy: String,
    confirmedCaptcha: Boolean,
    
})

module.exports = mongoose.model('InviteCount', inviteSchema)