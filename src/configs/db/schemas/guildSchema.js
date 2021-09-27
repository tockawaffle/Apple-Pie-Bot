const mongoose = require("mongoose")

const economySchema = new mongoose.Schema({
    _id: { required: true, type: String }, //guild ID,
    premium: Boolean,
    coinName: String,
    dataOfEconomy: Object, //Array-Json of all the users that have something in that server's economy
    economyRewards: Object,
    pendingRewards: Object,
    startedEconomy: Boolean,
    date: Date
})

module.exports = mongoose.model("per-server-economy", economySchema)