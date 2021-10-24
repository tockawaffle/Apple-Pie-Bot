const 
    {errorHandle} = require("@configs/other/errorHandle"),
    {checkGuild} = require("@configs/other/checkGuild"),
    {kickUser} = require("@configs/Moderation/kickUser"),
    lang = require("@lang");
module.exports = {
    aliases: [],
    run: async(client, messageCreate, args) => {

        const 
            {author, guild} = messageCreate,
            verify = await checkGuild(messageCreate, author);
        if(verify.verify !== true) return 

        let 
            toKick,
            mentionedMember = messageCreate.mentions.members.first(),
            userID = guild.members.cache.get(args[0]),
            reason = args.slice(1).join(' ');
        if(mentionedMember) {toKick = mentionedMember}
        else if(userID) {toKick = userID}

        try {
            await kickUser(messageCreate, author, toKick, reason)
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }

    }
}