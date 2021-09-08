const lang = require("@lang")
const {errorHandle} = require("@configs/other/errorHandle")
const {banUser} = require("@configs/other/banUser")
module.exports = {
    aliases: [],
    run: async(client, messageCreate, args) => {

        const {author, guild} = messageCreate
        const {checkGuild} = require("@configs/other/checkGuild")
        const verify = await checkGuild(messageCreate, author)
        if(verify.verify !== true) return 

        let toBan,
            mentionedMember = messageCreate.mentions.members.first(),
            userID = guild.members.cache.get(args[0])
            reason = args[1]
        if(mentionedMember) {toBan = mentionedMember}
        else if(userID) {toBan = userID}

        try {
            await banUser(messageCreate, author, toBan, reason)
        } catch (error) {
            errorHandle(messageCreate, author, error)
        }

    }
}