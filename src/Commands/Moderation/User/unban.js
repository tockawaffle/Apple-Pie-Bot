const 
    {errorHandle} = require("@configs/other/errorHandle"),
    {checkGuild} = require("@configs/other/checkGuild"),
    {unbanUser} = require("@configs/Moderation/unbanUser");

module.exports = {
    aliases: [],
    run: async(client, messageCreate, args) => {

        const 
            {author} = messageCreate,
            verify = await checkGuild(messageCreate, author);
        if(verify.verify !== true) return 
        
        let 
            toUnban = args[0],
            reason = args.slice(1).join(' ');
        try {
            await unbanUser(messageCreate, author, toUnban, reason)
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }

    }
}