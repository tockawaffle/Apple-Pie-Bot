async function banUser(messageCreate, author, toBan, reason) {

    const lang = require("@lang"); const {Permissions, MessageEmbed} = require("discord.js")
    if(!messageCreate.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) { throw new Error(`${lang(author, "missing-permissions").replace("{perm}", `${lang(author, "ban-members")}`)}`)}
    if(!messageCreate.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) { throw new Error(`${lang(author, "missing-permissions-me").replace("{perms}", `${lang(author, "ban-members")}`)}`)}
    if(!toBan) {  throw new Error(`${lang(author, "no-args")}`) }
    if(toBan.id === author.id) { throw new Error(`${lang(author, "same-id-ban")}`)}
    if(!toBan.bannable) { throw new Error(`${lang(author, "not-bannable")}`)}
    if(!reason) reason = lang(author, "no-reason")

    try {
        await toBan.ban({reason: reason})
        const banEmbed = new MessageEmbed()
            .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))    
            .setColor("RANDOM")
            .setTitle(`${lang(author, "success")} ${lang(author, "banned")}`)
            .setDescription(`${lang(author, "banned-desc").replace("{ban}", `**${toBan.user.username}**`)}`)
        return messageCreate.reply({embeds: [banEmbed]})
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {banUser}