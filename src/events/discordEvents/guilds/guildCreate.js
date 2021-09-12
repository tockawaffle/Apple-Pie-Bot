const {loadUserLangs} = require("@lang")
module.exports = async(client, guild) => {
    const userSchema = require("@db/schemas/userSchema")
    for(const users of guild.members.cache) {
        const userId = users[0]
        const result = await userSchema.findOne({_id: userId})
        if(!result) {
            await userSchema.findOneAndUpdate({_id: userId}, {language: "english"}, {upsert: true})
            loadUserLangs(client)
        }
    }
}