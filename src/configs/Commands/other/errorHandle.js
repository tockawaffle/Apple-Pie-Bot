function errorHandle(messageCreate, auth, err) {

    const {author} = messageCreate
    const lang = require("@lang")
    const {MessageEmbed} = require('discord.js')
    const errorEmbed = new MessageEmbed()
        .setTitle(author.username, author.displayAvatarURL({dynamic: true}))
        .setDescription(`${lang(author, "bad")}\`\`\`${err}\`\`\`\n${lang(author, "bad-advise").replace("{command}", `${messageCreate.prefix}help`)}`)
        .setColor("DARK_RED")
    return messageCreate.reply({embeds: [errorEmbed]}).catch(error => {console.log(`Ironicamente, o errorHandler falhou em ser enviado, e esse é o motivo:\n${error}\nPossivelmente no servidor: ${messageCreate.guild.name}`)})   
}
module.exports = {errorHandle}