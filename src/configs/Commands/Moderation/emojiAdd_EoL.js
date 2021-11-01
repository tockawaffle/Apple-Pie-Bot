async function emojiAdd(messageCreate, name, urlOrEmote) {

    const 
        { MessageEmbed, Permissions } = require("discord.js"),
        { author, guild } = messageCreate,
        lang = require("@lang")

    let identifier, url, emoji;

    if(!messageCreate.member.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS)) throw new Error(`${lang(author, "missing-permissions").replace("{perm}", `${lang(author, "emoji-perms")}`)}`)
    if(!messageCreate.guild.me.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS)) throw new Error(`${lang(author, "missing-permissions-me").replace("{perm}", `${lang(author, "emoji-perms")}`)}`)
    
    if(!name) { throw new Error(`${lang(author, "missing-name")}`) }
    else if(!urlOrEmote) { throw new Error(lang(author, "missing-url-emote"))}

    else if(urlOrEmote.match(/<:.+?:\d+>/g)) { emoji = urlOrEmote.match(/\d+/g); url = `https://cdn.discordapp.com/emojis/${emoji}.png`; } 
    else if(urlOrEmote.match(/<a:.+?:\d+>/g)) { emoji = urlOrEmote.match(/\d+/g); url = `https://cdn.discordapp.com/emojis/${emoji}.gif`; } 
    
    if(name.includes("-")) name = name.replace(/[#-]/g, "_")
    guild.emojis.create(url || urlOrEmote, `${name}`).catch(error => {throw new Error(error)})

    const created = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(author.username, author.displayAvatarURL())
        .setDescription(`${lang(author, "success")} ${lang(author, "created-emoji")}\n**${lang(author, "emoji-name")}** \`\`\`${name}\`\`\``)
    return await messageCreate.reply({embeds: [created]})
    
}
module.exports = {emojiAdd}