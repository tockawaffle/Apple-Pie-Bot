async function roleDelete(messageCreate, author, role) {
    
    const 
        { MessageEmbed, Permissions} = require("discord.js"),
        lang = require("@lang");
    if(!messageCreate.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) throw new Error(lang(author, "missing-permissions").replace("{perm}", lang(author, "roles-perm")))
    if(!messageCreate.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) throw new Error(lang(author, "missing-permissions-me").replace("{perms}", lang(author, "roles-perm")))
    if(!role) throw new Error(lang(author, "no-role-name-delete"))

    try {
        const deleteEmbed = new MessageEmbed()
            .setAuthor({name: author.username, url: author.displayAvatarURL({dynamic: true})})
            .setDescription(`${lang(author, "delete-role-desc").replace("{role}", role.name)}`)
            .setColor("RANDOM")
        messageCreate.reply({embeds: [deleteEmbed]})
        await role.delete()
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {roleDelete}