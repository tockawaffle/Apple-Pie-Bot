async function emojiAdd(messageCreate, input, name, author, attachment) {

    const { MessageEmbed, Permissions } = require("discord.js");
    const lang = require("@lang")
    try {

        let identifier, url, emoji, nameToUse;

        if(!messageCreate.member.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS)) throw new Error(`${lang(author, "missing-permissions").replace("{perm}", `${lang(author, "emoji-perms")}`)}`)
        if(!messageCreate.guild.me.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS)) throw new Error(`${lang(author, "missing-permissions-me").replace("{perm}", `${lang(author, "emoji-perms")}`)}`)
        
        if(!name && !attachment) { throw new Error(`${lang(author, "missing-name")}`) } 
        else if(!input) { throw new Error(`${lang(author, "no-args")}\n${lang(author, "emote-or-url")}`) }

        if(attachment) {
            url = attachment; name = input; identifier = "Attachment"
        }
        else if(input.match(/<:.+?:\d+>/g)) { emoji = input.match(/\d+/g); url = `https://cdn.discordapp.com/emojis/${emoji}.png`; identifier = "Emoji JPG" } 
        else if(input.match(/<a:.+?:\d+>/g)) { emoji = input.match(/\d+/g); url = `https://cdn.discordapp.com/emojis/${emoji}.gif`; identifier = "Emoji GIF" } 
        else if(input.match(/(https?:\/\/)?(cdn\.)?(discordapp\.com\/emojis)\/[a-zA-Z0-9_.]{18}(.gif|.png|.jpg|.jpeg).v=1/) || input.match(/(https?:\/\/)?(cdn\.|media\.)?(discordapp\.(com|net)\/attachments)\/[0-9]{18}\/[0-9]{18}\/[a-zA-Z0-9-_]+(.png|.gif|.jpeg|.jpg)/)) { identifier = "URL"; url = input }
        
        if(identifier === "Emoji JPG" || identifier === "Emoji GIF" || identifier === "URL" || identifier === "Attachment") {
            try {
                if(name.includes("-")) name = name.replace(/[#-]/g, "_")
                messageCreate.guild.emojis.create(url, `${name || input}`).catch(error => {return err = error})

                const created = new MessageEmbed()
                    .setColor("RANDOM")
                    .setAuthor(author.username, author.displayAvatarURL())
                    .setDescription(`${lang(author, "success")} ${lang(author, "created-emoji")}\n**${lang(author, "emoji-name")}** \`\`\`${name || nameToUse}\`\`\``)
                await messageCreate.reply({embeds: [created]}); return
            } catch (error) {
                throw new Error(error)
            }
        }
    } catch (error) {
        throw new Error(error)
    }
    
}
module.exports = {emojiAdd}