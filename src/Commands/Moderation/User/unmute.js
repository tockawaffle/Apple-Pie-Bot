const 
    {errorHandle} = require("@configs/other/errorHandle"),
    {unmuteUser} = require("@configs/Moderation/unmuteUser"),
    {checkGuild} = require("@configs/other/checkGuild"),
    lang = require("@lang");
module.exports = {
    aliases: [],
    run: async(client, messageCreate, args) => {
        const {author, guild} = messageCreate
        try {
            const verify = await checkGuild(messageCreate, author, true)
            if(verify !== true) return 

            let
                toUnmute,
                mentionedMember = messageCreate.mentions.members.first(),
                userID = guild.members.cache.get(args[0]),
                reason = args.slice(1).join(' ');
            if(mentionedMember) {toUnmute = mentionedMember}
            else if(userID) {toUnmute = userID}
        
            await unmuteUser(messageCreate, toUnmute, reason)
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }
    }
}