const mongoose = require("mongoose")

const steam = new mongoose.Schema({
    _id: { required: true, type: String }, //guild ID,
    steamId: { required: true, type: String }, //steam ID
})

module.exports = mongoose.model("steam", steam)