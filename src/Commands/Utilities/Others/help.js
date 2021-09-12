const { MessageEmbed, Interaction } = require("discord.js")
const lang = require("@lang")
const {errorHandle} = require("@configs/other/errorHandle")
const {buttonsPagination} = require("djs-buttons-pagination")
module.exports = {
    aliases: [],
    run: async(client, messageCreate, args) => {
        
        const {user} = client
        const {author} = messageCreate
        const prefix = messageCreate.prefix
        
        try {
            const mainEmbed = new MessageEmbed()
                .setAuthor(user.username, user.displayAvatarURL({dynamic: true}))
                .setDescription(`${lang(author, "help-mainEmbed-intro")}\n\n${lang(author, "help-mainEmbed-tosp")}\n\n${lang(author, "help-mainEmbed-github")}\n\n${lang(author, "help-mainEmbed-options").replace("{prefix}", prefix)}`)
                .setColor("RANDOM")
                .setFooter(lang(author, "can-be-used-on-dms"), author.displayAvatarURL({dynamic: true}))
            const userConfigEmbed = new MessageEmbed()
                .setAuthor(user.username, user.displayAvatarURL({dynamic: true}))
                .setColor("RANDOM")
                .setDescription(`${lang(author, "help-userconfig-desc")}`)
                .addFields(
                    {name: lang(author, "help-uconfig"), value: `${prefix}uconfig [<options>](https://github.com/The-Crow-pleb/Apple-Pie-Bot/blob/Apple-Pie-v13/src/configs/Commands/Texts/uconfig-opts.md) <args>`}
                )
                .setFooter(lang(author, "can-be-used-on-dms"), author.displayAvatarURL({dynamic: true}))
            const modEmbed = new MessageEmbed()
                .setAuthor(user.username, user.displayAvatarURL({dynamic: true}))
                .setColor("RANDOM")
                .setDescription(`${lang(author, "help-mod-desc")}\`\`\`${prefix}ban <@mention | userID> <?reason>\n${prefix}unban <userID> <?reason>\n${prefix}mute <@mention | userID> <reason>\n${prefix}unmute <@mention | userID>\n${prefix}kick <@mention | userID> <?reason>\n${prefix}addemote <emoji | discord URL | image attached> <name>\n${prefix}role <${lang(author, "create-role")} | ${lang(author, "delete-role")}> <args>\`\`\``)
                .setFooter(lang(author, "can-not-be-used-on-dms"), author.displayAvatarURL({dynamic: true}))
            const roleplayEmbed = new MessageEmbed()
                .setAuthor(user.username, user.displayAvatarURL({dynamic: true}))
                .setColor("RANDOM")
                .setDescription(`${lang(author, "help-roleplay-desc")}\`\`\`${prefix}kiss <@mention>\n${prefix}hug <@mention>\n${prefix}pat <@mention>\n${prefix}slap <@mention>\`\`\``)
                .setFooter(lang(author, "can-not-be-used-on-dms"), author.displayAvatarURL({dynamic: true}))
            const utilitiesEmbed = new MessageEmbed()
                .setAuthor(user.username, user.displayAvatarURL({dynamic: true}))
                .setColor("RANDOM")
                .setDescription(`${lang(author, "help-utils-desc")}\`\`\`${prefix}weather <City/State>\n${prefix}avatar <@mention | userID | if not both, yours will be showed.>\n${prefix}userinfo <@mention | userID>\n${prefix}translate <text> (${lang(author, "help-translate-field")})\`\`\``)
                .setFooter(lang(author, "some-can-be-used-on-dms"), author.displayAvatarURL({dynamic: true}))
            const cryptoEmbed = new MessageEmbed()
                .setAuthor(user.username, user.displayAvatarURL({dynamic: true}))
                .setColor("RANDOM")
                .setDescription(`${lang(author, "help-crypto-desc")}\`\`\`${prefix}gecko <coin API id | alias>\n${prefix}pancake <token contract>\`\`\``)
                .setFooter(lang(author, "can-be-used-on-dms"), author.displayAvatarURL({dynamic: true}))
            if(!args[0]) {
                pages = [mainEmbed, userConfigEmbed, modEmbed, roleplayEmbed, utilitiesEmbed, cryptoEmbed]
                await buttonsPagination(messageCreate, pages, [], 15000)
            } 
            else if(args[0] === "main") {messageCreate.reply({embeds: [mainEmbed]})}
            else if(args[0] === "config") {messageCreate.reply({embeds: [userConfigEmbed]})}
            else if(args[0] === "roleplay") {messageCreate.reply({embeds: [roleplayEmbed]})}
            else if(args[0] === "utils") {messageCreate.reply({embeds: [utilitiesEmbed]})}
            else if(args[0] === "mod") {messageCreate.reply({embeds: [modEmbed]})}
            else if(args[0] === "crypto") {messageCreate.reply({embeds: [cryptoEmbed]})}
        } catch (error) {
            errorHandle(messageCreate, author, error)
        }

    }
}