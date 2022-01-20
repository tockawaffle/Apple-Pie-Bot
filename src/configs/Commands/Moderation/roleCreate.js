async function roleCreate(messageCreate, author, name, color) {
    const 
        { MessageEmbed, Permissions} = require("discord.js"),
        lang = require("@lang");
    if(!messageCreate.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) throw new Error(lang(author, "missing-permissions").replace("{perm}", lang(author, "roles-perm")))
    if(!messageCreate.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) throw new Error(lang(author, "missing-permissions-me").replace("{perms}", lang(author, "roles-perm")))
    if(!name) throw new Error(lang(author, "no-role-name"))

    try {
        const created = await messageCreate.guild.roles.create({name: name, color: color ? color: "GREY"})
        const createEmbed = new MessageEmbed()
            .setAuthor({name: author.username, iconURL: author.displayAvatarURL({dynamic: true})})
            .setDescription(`${lang(author, "create-role-desc").replace("{role}", created.name).replace("{color}", color ? color: lang(author, "default-color"))}\n${lang(author, "no-role-color")}`)
            .setColor("RANDOM")

        messageCreate.reply({embeds: [createEmbed]})
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {roleCreate}