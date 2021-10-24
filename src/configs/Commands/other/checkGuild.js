async function checkGuild(messageCreate, author) {

    const 
        {guild} = messageCreate,
        lang = require("@lang"),
        { MessageEmbed } = require("discord.js");
    let verify
    if(guild === null || guild === undefined || !guild) {
        const noGuild = new MessageEmbed()
            .setAuthor(author.username, author.displayAvatarURL())
            .setDescription(`${lang(author, "no-guild")}`)
            .setColor("DARK_RED")
        messageCreate.reply({embeds: [noGuild]})
        return {verify: false}
    } else {
        return {verify: true}
    }
    
}
module.exports = {checkGuild}