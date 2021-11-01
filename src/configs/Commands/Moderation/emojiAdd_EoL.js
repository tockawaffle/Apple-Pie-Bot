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

    else if(urlOrEmote.match(/<:.+?:\d+>/g)) { emoji = urlOrEmote.match(/\d+/g); url = `https://cdn.discordapp.com/emojis/${emoji}.png`; identifier = "Emoji JPG" } 
    else if(urlOrEmote.match(/<a:.+?:\d+>/g)) { emoji = urlOrEmote.match(/\d+/g); url = `https://cdn.discordapp.com/emojis/${emoji}.gif`; identifier = "Emoji GIF" } 
    else if(urlOrEmote.match(/(https?:\/\/)?(cdn\.)?(discordapp\.com\/emojis)\/[a-zA-Z0-9_.]{18}(.gif|.png|.jpg|.jpeg).v=1/) || urlOrEmote.match(/(https?:\/\/)?(cdn\.|media\.)?(discordapp\.(com|net)\/attachments)\/[0-9]{18}\/[0-9]{18}\/[a-zA-Z0-9-_]+(.png|.gif|.jpeg|.jpg)/)) { identifier = "URL"; url = urlOrEmote }
    
    if(name.includes("-")) name = name.replace(/[#-]/g, "_")
    guild.emojis.create(url, `${name}`).catch(error => {throw new Error(error)})

    const created = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(author.username, author.displayAvatarURL())
        .setDescription(`${lang(author, "success")} ${lang(author, "created-emoji")}\n**${lang(author, "emoji-name")}** \`\`\`${name}\`\`\``)
    return await messageCreate.reply({embeds: [created]})
    
}
module.exports = {emojiAdd}