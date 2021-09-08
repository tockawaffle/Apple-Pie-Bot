const { MessageEmbed } = require("discord.js")
const {errorHandle} = require("@configs/other/errorHandle")
module.exports = {
    aliases: [],
    run: async(client, messageCreate, args) => {

        const {author, mentions, guild} = messageCreate
        try {
            if(!args[0]) {
                const authorAvatarEmbed = new MessageEmbed()
                    .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                    .setColor("RANDOM")
                    .setDescription(`🔎 ${author.username}`)
                    .setImage(`${ await author.displayAvatarURL(({dynamic: true, size: 2048, format: 'png'}))}`)
                return messageCreate.reply({embeds: [authorAvatarEmbed]})
            } else {
                const memberId = guild.members.cache.get(args[0]) || mentions.users.first()
                const globalId = client.users.cache.get(args[0])
                let mentionedMember; let text;
                if(memberId) { mentionedMember = mentions.users.first() || memberId.user; text = `🔍 ${ await mentionedMember.username}` }
                else {  mentionedMember = globalId; text = `🔎🌎 ${globalId.username}` }
                
                const avatarEmbed = new MessageEmbed()
                    .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                    .setColor("RANDOM")
                    .setDescription(`${text}`)
                    .setImage(`${ await mentionedMember.displayAvatarURL(({dynamic: true, size: 2048, format: 'png'}))}`)
                return messageCreate.reply({embeds: [avatarEmbed]})
            }
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }
        
    }
}