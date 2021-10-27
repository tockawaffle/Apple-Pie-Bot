const lang = require("@lang")
const {errorHandle} = require("@configs/other/errorHandle")
const {checkGuild} = require("@configs/other/checkGuild")
const {muteUser} = require("@configs/Moderation/muteUser")
module.exports = {
    aliases: [],
    run: async(client, messageCreate, args) => {

        const 
            {author, guild} = messageCreate,
            verify = await checkGuild(messageCreate, author, true);
        if(verify !== true) return 
        let 
            toMute,
            mentionedMember = messageCreate.mentions.members.first(),
            userID = guild.members.cache.get(args[0]),
            reason = args.slice(1).join(' ');
        if(mentionedMember) {toMute = mentionedMember}
        else if(userID) {toMute = userID}

        try {
            await muteUser(client, messageCreate, toMute, reason)
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }
    }
}