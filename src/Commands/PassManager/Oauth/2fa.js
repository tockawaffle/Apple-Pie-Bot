const 
    {MessageEmbed} = require("discord.js"),
    {oauthVerify} = require("@configs/PassManager/OAuth/oauthVerify.js"),
    {oauthRemove} = require("@configs/PassManager/OAuth/oauthRemove.js"),
    {oauthSetup} = require("@configs/PassManager/OAuth/oauthSetup.js"),
    {errorHandle} = require("@configs/other/errorHandle"),
    {checkGuild} = require("@configs/other/checkGuild"),
    userSchema = require("@db/schemas/userSchema");

module.exports = {
    aliases: ["oauth"],
    run: async(client, messageCreate, args) => {
        const 
            {author} = messageCreate,
            userConfig = await userSchema.findOne({_id: author.id}),
            verify = await checkGuild(messageCreate, author);
        if(verify === true) return

        if(userConfig.oauth) {
            if(args[0] === "remove") {
                try { await oauthRemove(messageCreate) }
                catch (error) { await errorHandle(messageCreate, author, error) }
            } else if(!args[0]) {
                const testEmbed = new MessageEmbed()
                    .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                    .setDescription(lang(author, "oauth-setup-noargs"))
                    .setColor("RANDOM")
                return await messageCreate.reply({embeds: [testEmbed]})
            } else if(args[0] === "verify") {
                try { await oauthVerify(messageCreate) }
                catch (error) { await errorHandle(messageCreate, author, error) }
            }
        } else {
            try { await oauthSetup(messageCreate) } 
            catch (error) { await errorHandle(messageCreate, author, error) }
        }
    }
}