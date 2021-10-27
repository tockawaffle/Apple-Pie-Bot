const 
    { MessageEmbed } = require("discord.js"),
    {checkGuild} = require("@configs/other/checkGuild"),
    {errorHandle} = require("@configs/other/errorHandle");
module.exports = {
    aliases: ["av"],
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
                const verified = await checkGuild(messageCreate, author)
                if(verified === false) {
                    const 
                        globalId = client.users.cache.get(args[0]),
                        avatarEmbed = new MessageEmbed()
                            .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                            .setColor("RANDOM")
                            .setDescription(`🔎🌎 ${globalId.username}`)
                            .setImage(`${ await globalId.displayAvatarURL(({dynamic: true, size: 2048, format: 'png'}))}`)
                    return await messageCreate.reply({embeds: [avatarEmbed]})
                }
                const 
                    memberId = guild.members.cache.get(args[0]) || mentions.users.first(),
                    globalId = client.users.cache.get(args[0])
                let 
                    mentionedMember, 
                    text;
                if(memberId !== null){ 
                    mentionedMember = mentions.users.first() || memberId.user; text = `🔍 ${ await mentionedMember.username}` 
                } else { 
                    mentionedMember = globalId; text = `🔎🌎 ${globalId.username}` 
                }
                
                const avatarEmbed = new MessageEmbed()
                    .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                    .setColor("RANDOM")
                    .setDescription(`${text}`)
                    .setImage(`${ await mentionedMember.displayAvatarURL(({dynamic: true, size: 2048, format: 'png'}))}`)
                return await messageCreate.reply({embeds: [avatarEmbed]})
            }
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }
    }
}