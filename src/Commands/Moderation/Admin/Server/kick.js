const lang = require("@lang")
const {errorHandle} = require("@configs/other/errorHandle")
const {kickUser} = require("@configs/other/kickUser")
module.exports = {
    aliases: [],
    run: async(client, messageCreate, args) => {

        const {author, guild} = messageCreate
        const {checkGuild} = require("@configs/other/checkGuild")
        const verify = await checkGuild(messageCreate, author)
        if(verify.verify !== true) return 

        let toKick,
            mentionedMember = messageCreate.mentions.members.first(),
            userID = guild.members.cache.get(args[0])
            reason = args.slice(1).join(' ')
        if(mentionedMember) {toKick = mentionedMember}
        else if(userID) {toKick = userID}

        try {
            await kickUser(messageCreate, author, toKick, reason)
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }

    }
}