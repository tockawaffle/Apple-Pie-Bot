function errorHandle(messageCreate, author, err) {
    const lang = require("@lang")
    const {MessageEmbed} = require('discord.js')
    const errorEmbed = new MessageEmbed()
        .setTitle(author.username, author.displayAvatarURL({dynamic: true}))
        .setDescription(`${lang(author, "bad")}\`\`\`${err}\`\`\`\n${lang(author, "bad-advise")}`)
        .setColor("DARK_RED")
    return messageCreate.reply({embeds: [errorEmbed]})
}
module.exports = {errorHandle}