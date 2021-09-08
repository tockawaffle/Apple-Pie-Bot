const lang = require("@lang")
const {errorHandle} = require("@configs/other/errorHandle")
const {unmuteUser} = require("@configs/other/unmuteUser")
module.exports = {
    aliases: [],
    run: async(client, messageCreate, args) => {
        const {author, guild} = messageCreate
        try {
            const {checkGuild} = require("@configs/other/checkGuild")
            const verify = await checkGuild(messageCreate, author)
            if(verify.verify !== true) return 

            let toUnmute,
                mentionedMember = messageCreate.mentions.members.first(),
                userID = guild.members.cache.get(args[0])
                reason = args.slice(1).join(' ')
            if(mentionedMember) {toUnmute = mentionedMember}
            else if(userID) {toUnmute = userID}
        
            await unmuteUser(messageCreate, toUnmute, reason)
        } catch (error) {
            errorHandle(messageCreate, author, error)
        }
    }
}