const mongoose = require("mongoose")
const reqString = {
    required: true,
    type: String
}
const UserSchema = new mongoose.Schema({
    _id: reqString,
    language: reqString,
    prefix: reqString,
})

module.exports = mongoose.model("User", UserSchema)