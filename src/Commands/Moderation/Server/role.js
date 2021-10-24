const 
    {checkGuild} = require("@configs/other/checkGuild"),
    {errorHandle} = require("@configs/other/errorHandle"),
    {roleCreate} = require("@configs/Moderation/roleCreate"),
    {roleDelete} = require("@configs/Moderation/roleDelete"),
    lang = require("@lang");

module.exports = {
    aliases: [],
    run: async(client, messageCreate, args) => {

        const   
            {author, guild} = messageCreate,
            verify = await checkGuild(messageCreate, author);
        if(verify.verify !== true) return 

        if(args[0] === lang(author, "create-role")) {
            try {
                await roleCreate(messageCreate, author, args[1], args[2])
            } catch (error) {
                await errorHandle(messageCreate, author, error)
            }
        } else if(args[0] === lang(author, "delete-role")) {
            try {
                let roleToDelete,
                    mentionedRole = messageCreate.mentions.roles.first(),
                    roleId = guild.roles.cache.get(args[1])
                if(mentionedRole) {roleToDelete = mentionedRole}
                else if(roleId) {roleToDelete = roleId}
                await roleDelete(messageCreate, author, roleToDelete)
            } catch (error) {
                await errorHandle(messageCreate, author, error)
            }
        }
    }
}