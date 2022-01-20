async function slowmodeAdd(messageCreate, channel, author, time, reason) {

    const 
        { MessageEmbed, Permissions} = require("discord.js"),
        lang = require("@lang");
    if(!messageCreate.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) throw new Error(lang(author, "missing-permissions").replace("{perm}", lang(author, "roles-perm")))
    if(!messageCreate.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) throw new Error(lang(author, "missing-permissions-me").replace("{perms}", lang(author, "roles-perm")))
    if(!channel) throw new Error(lang(author, "no-channel"))
    if(!time) throw new Error(lang(author, "no-time"))
    if(isNaN(time)) throw new Error(lang(author, "time-not-a-number"))
    if(time > 21600) throw new Error(lang(author, "too-much-time"))
    
    try {
        await channel.setRateLimitPerUser(time, reason?reason:lang(author, "not-provided"))
        const setLimitEmbed = new MessageEmbed()
            .setAuthor({name: author.username, iconURL: author.displayAvatarURL({dynamic: true})})
            .setColor("RANDOM")
            .setDescription(`${lang(author, "set-limit").replace("{time}", time).replace("{channel}", channel.name).replace("{reason}", reason?reason:lang(author,"not-provided"))}`) 
        messageCreate.reply({embeds: [setLimitEmbed]})
    } catch (error) {
        throw new Error(error)
    }
} 
module.exports = {slowmodeAdd}