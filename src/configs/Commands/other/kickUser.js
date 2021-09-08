async function kickUser(messageCreate, author, toKick, reason) {

    const lang = require("@lang"); const {Permissions, MessageEmbed} = require("discord.js")
    if(!messageCreate.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) { throw new Error(`${lang(author, "missing-permissions").replace("{perm}", `${lang(author, "ban-members")}`)}`)}
    if(!messageCreate.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) { throw new Error(`${lang(author, "missing-permissions-me").replace("{perms}", `${lang(author, "ban-members")}`)}`)}
    if(!toKick) {  throw new Error(`${lang(author, "no-args")}`) }
    if(!toKick.kickable) { throw new Error(`${lang(author, "not-bannable")}`)}
    if(toKick.id === author.id) { throw new Error(`${lang(author, "same-id-ban")}`)}
    if(!reason) reason = lang(author, "no-reason")

    try {
        await toKick.kick({reason: reason})
        const toKickEmbed = new MessageEmbed()
            .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))    
            .setColor("RANDOM")
            .setTitle(`${lang(author, "success")} ${lang(author, "kick")}`)
            .setDescription(`${lang(author, "kick-desc").replace("{kick}", `**${toKick.user.username}**`).replace("{reason}", reason)}`)
        return messageCreate.reply({embeds: [toKickEmbed]})
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {kickUser}