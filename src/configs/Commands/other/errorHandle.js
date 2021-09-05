function errorHandle(messageCreate, author, err) {
    const lang = require("@lang")
    const {MessageEmbed} = require('discord.js')
    const errorEmbed = new MessageEmbed()
        .setTitle(author.username, author.displayAvatarURL({dynamic: true}))
        .setDescription(`${lang(author, "bad")}\`\`\`${err}\`\`\``)
        .setColor("DARK_RED")
    return messageCreate.reply({embeds: [errorEmbed]}).then(messageCreate.delete())
}
module.exports = {errorHandle}