async function emojiAddWithAttach(messageCreate, name, attachment) {

    const
        { MessageEmbed, Permissions } = require("discord.js"),
        { author, guild } = messageCreate,
        lang = require("@lang");

    if(!messageCreate.member.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS)) throw new Error(`${lang(author, "missing-permissions").replace("{perm}", `${lang(author, "emoji-perms")}`)}`)
    if(!messageCreate.guild.me.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS)) throw new Error(`${lang(author, "missing-permissions-me").replace("{perm}", `${lang(author, "emoji-perms")}`)}`)

    if(!attachment) { throw new Error(lang(author, "missing-attachment")) }
    else if(!name) { throw new Error(`${lang(author, "missing-name")}`) }

    if(name.includes("-")) name = name.replace(/[#-]/g, "_")
    guild.emojis.create(attachment.attachment, `${name}`).catch(err => {throw new Error(err)})

    const created = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(author.username, author.displayAvatarURL())
        .setDescription(`${lang(author, "success")} ${lang(author, "created-emoji")}\n**${lang(author, "emoji-name")}** \`\`\`${name}\`\`\``)
    return await messageCreate.reply({embeds: [created]});

}

module.exports = {emojiAddWithAttach}
