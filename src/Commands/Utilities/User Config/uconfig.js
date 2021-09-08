const { MessageEmbed } = require("discord.js"); const {buttonsPagination: pagination} = require("djs-buttons-pagination")
const {changePrefix} = require("@configs/uconfig/changePrefix"); const {changeLanguage} = require("@configs/uconfig/changeLanguage"); const {errorHandle} = require("@configs/other/errorHandle")
const lang = require("@lang")
module.exports = {
    aliases: [],
    run:async(client, messageCreate, args) => {

        const {author} = messageCreate
        const configArg = args[0]
        try {
            if(!configArg) {
                const noArg = new MessageEmbed()
                    .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                    .setColor("DARK_RED")
                    .setTitle(`${lang(author, "error")} ${lang(author, "no-args")}`)
                    .setDescription(`${lang(author, "no-args-correct").replace("{command}", `\`\`\`\n${messageCreate.prefix}uconfig <Options> <Arg>\`\`\``)}`)
                    
                const opts = new MessageEmbed()
                    .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                    .setColor("DARK_RED")
                    .setDescription(`${lang(author, "accp-opts").replace("{opts}", `\`\`\`\nlanguage\nprefix\nprivacy\`\`\``)}`)
                    
                return pagination(messageCreate, [noArg, opts], [], 15000)
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