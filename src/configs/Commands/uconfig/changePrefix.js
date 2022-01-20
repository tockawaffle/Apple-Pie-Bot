async function changePrefix(messageCreate, author, prefixo, lang) {
    const {MessageEmbed} = require("discord.js")
    if(!author) throw new Error(`Falta um autor para a mudança.`)
    else if(!prefixo) {
        const noPrefix = new MessageEmbed()
            .setAuthor({name: author.username, iconURL: author.displayAvatarURL({dynamic: true})})
            .setColor("RED")
            .setTitle(`${lang(author, "error")} ${lang(author, "noprefix")}`)
        return messageCreate.reply({embeds: [noPrefix]})
    } else {
        
        const 
            userSchema = require("@db/schemas/userSchema"),
            checker = await userSchema.findOne({_id: author.id});
        if(!checker) {
            await userSchema.findOneAndUpdate({_id: author.id}, {_id: author.id, prefix: prefixo}, {upsert: true})
            const redo = new MessageEmbed()
                .setAuthor({name: author.username, iconURL: author.displayAvatarURL({dynamic: true})})
                .setColor("GREEN")
                .setTitle(`${lang(author, "error")} ${lang(author, "redo-noreg")}`)
            return messageCreate.reply({embeds: [redo]})
        } else {
            await userSchema.findOneAndUpdate({_id: author.id}, {_id: author.id, prefix: prefixo}, {upsert: true})
            const changed = new MessageEmbed()
                .setAuthor({name: author.username, iconURL: author.displayAvatarURL({dynamic: true})})
                .setColor("GREEN")
                .setTitle(`${lang(author, "success")} ${lang(author, "prefix-changed")}`)
                .setDescription(`${lang(author, "prefix-new").replace("{prefix}", prefixo)}`)
            return messageCreate.reply({embeds: [changed]})
        }
    }
}

module.exports = {changePrefix}