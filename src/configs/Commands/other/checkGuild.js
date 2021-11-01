async function checkGuild(messageCreate, author, sendError = Boolean()) {

    const 
        {guild} = messageCreate,
        lang = require("@lang"),
        { MessageEmbed } = require("discord.js");
    if(guild === null || guild === undefined || !guild) {
        if(sendError === true) { 
            const noGuild = new MessageEmbed()
                .setAuthor(author.username, author.displayAvatarURL())
                .setDescription(`${lang(author, "no-guild")}`)
                .setColor("DARK_RED")
            return await messageCreate.reply({embeds: [noGuild]})
        } else if (sendError === false) {
            return verify = false
        }
    } else {
        return verify = true
    }
}
module.exports = {checkGuild}