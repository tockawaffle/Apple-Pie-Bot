const 
    { MessageEmbed } = require("discord.js"),
    {buttonsPagination: pagination} = require("djs-buttons-pagination"),
    {changePrefix} = require("@configs/uconfig/changePrefix"),
    {changeLanguage} = require("@configs/uconfig/changeLanguage"),
    {errorHandle} = require("@configs/other/errorHandle"),
    lang = require("@lang");
module.exports = {
    aliases: [],
    description: "Command to configure the bot for you",
    category: "Utilities",
    run:async(client, messageCreate, args) => {

        const 
            {author} = messageCreate,
            configArg = args[0];
        try {
            if(!configArg) {
                const noArg = new MessageEmbed()
                    .setAuthor({name: author.username, iconURL: author.displayAvatarURL({dynamic: true})})
                    .setColor("DARK_RED")
                    .setTitle(`${lang(author, "error")} ${lang(author, "no-args")}`)
                    .setDescription(`${lang(author, "no-args-correct").replace("{command}", `\`\`\`\n${messageCreate.prefix}uconfig <Options> <Arg>\`\`\``)}`)
                const opts = new MessageEmbed()
                    .setAuthor({name: author.username, iconURL: author.displayAvatarURL({dynamic: true})})
                    .setColor("DARK_RED")
                    .setDescription(`${lang(author, "accp-opts").replace("{opts}", `\`\`\`\nlanguage\nprefix\nprivacy\`\`\``)}`)  
                return await pagination(messageCreate, [noArg, opts], [], 15000)
            } else {
                if(configArg === lang(author, "prefix")) {
                    return await changePrefix(messageCreate, author, args[1], lang)
                } else if(configArg === lang(author, "language")) {
                    return await changeLanguage(messageCreate, author, args[1], lang)
                }
            }
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }
    }
}