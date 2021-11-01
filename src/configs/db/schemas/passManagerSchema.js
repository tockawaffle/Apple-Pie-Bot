const mongoose = require("mongoose")

const passManSchema = new mongoose.Schema({
    _id: { required: true, type: String }, //User ID,
    premium: Boolean,
    password: { required: true, type: String }, //Hashed password
    hints: {required: true, type: Array},
    accounts: Object //Array of accounts, example: [{accName: Example, encryptedPass: (encrypted password), hashDecryptKey: (same password as before, or, other pass used in the configuration.), date: (Date that this acc was stored.) }]
})

module.exports = mongoose.model("pass-mng", passManSchema)