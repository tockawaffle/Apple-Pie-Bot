async function unbanUser(messageCreate, author, toUnban, reason) {

    const lang = require("@lang"); const {Permissions, MessageEmbed} = require("discord.js")
    if(!messageCreate.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) { throw new Error(`${lang(author, "missing-permissions").replace("{perm}", `${lang(author, "ban-members")}`)}`)}
    if(!messageCreate.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) { throw new Error(`${lang(author, "missing-permissions-me").replace("{perms}", `${lang(author, "ban-members")}`)}`)}
    if(!toUnban) {  throw new Error(`${lang(author, "no-args")}`) }
    if(toUnban.id === author.id) { throw new Error(`${lang(author, "same-id-ban")}`)}
    if(!reason) reason = lang(author, "no-reason")

    try {
        await messageCreate.guild.members.unban(toUnban, {reason: reason})
        const unbanEmbed = new MessageEmbed()
            .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))    
            .setColor("RANDOM")
            .setTitle(`${lang(author, "success")} ${lang(author, "unbanned")}`)
            .setDescription(`${lang(author, "unbanned-desc").replace("{ban}", `**${toUnban}**`).replace("{reason}", reason)}`)
        return messageCreate.reply({embeds: [unbanEmbed]})
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {unbanUser}