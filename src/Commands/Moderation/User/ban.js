const 
    {errorHandle} = require("@configs/other/errorHandle"),
    {checkGuild} = require("@configs/other/checkGuild"),
    {banUser} = require("@configs/Moderation/banUser");
    
module.exports = {
    aliases: [],
    run: async(client, messageCreate, args) => {

        const 
            {author, guild} = messageCreate,
            verify = await checkGuild(messageCreate, author, true);
        if(verify !== true) return 

        let toBan,
            mentionedMember = messageCreate.mentions.members.first(),
            userID = guild.members.cache.get(args[0])
            reason = args.slice(1).join(' ')
        if(mentionedMember) {toBan = mentionedMember}
        else if(userID) {toBan = userID}

        try {
            await banUser(messageCreate, author, toBan, reason)
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }

    }
}