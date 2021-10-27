async function changeLanguage(messageCreate, author, targetLanguage) {
    
    const 
        { MessageEmbed } = require("discord.js"),
        userLangSchema = require("@db/schemas/userSchema"),
        lang = require('@lang');
    
    if(!targetLanguage) {
        const noargs = new MessageEmbed()
            .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
            .setColor("RED")
            .setDescription(lang(author, "config_lang_err_noargs"))
            .addFields({name: lang(author, "config_lang_err_noargs-nolang_2"),value: `\`\`\`${messageCreate.prefix}config language english | portugues\`\`\``},)
        return await messageCreate.reply({embeds: [noargs]})
    }
    const { languages } = require('../../../utils/languages/languages.json')
    if (!languages.includes(targetLanguage)) {
        const noLang = new MessageEmbed()
            .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
            .setColor("RED")
            .setDescription(lang(author, "config_lang_err_nolang"))
            .addFields(
                {name: `${lang(author, "config_lang_err_nolang_2")}`,value: `\`\`\`${targetLanguage}\`\`\``},
                {name: `${lang(author, "config_lang_err_noargs-nolang_2")}`, value: `\`\`\`${messageCreate.prefix}config language english | portugues\`\`\``}
            )
        return await messageCreate.reply({embeds: [noLang]})
    } else {
        const { setUserLanguage } = require('@lang');
        setUserLanguage(author, targetLanguage)
        const success = new MessageEmbed()
            .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
            .setDescription(lang(author, "config_lang_set"))
            .addFields({name: lang(author, "config_lang_set_1"),value: `\`\`\`${targetLanguage}\`\`\``})
            .setColor("RANDOM")
        await messageCreate.reply({embeds: [success]}); 
        await userLangSchema.findOneAndUpdate({_id:author.id},{language: targetLanguage,},{upsert: true,})
    }
}
module.exports = {changeLanguage}