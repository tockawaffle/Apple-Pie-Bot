const { MessageEmbed } = require("discord.js")
const languages = require("../../../util/languages/languages")
const page = require('discord.js-pagination')
module.exports = {
    aliases: ['av'],
    description: "Mostra o avatar de um usuário",
    run: async(client, message, args) => {
        const {guild} = message
        const member = message.mentions.members.first() || guild.members.cache.get(args[0])
        const gUser = client.users.cache.get(args[0])


        if(gUser && !member) {
            const avatar = gUser.avatarURL({dynamic: true, size: 2048, format: 'png'})
            const avatar2 = message.author.avatarURL({dynamic: true, size: 2048, format: 'png'})
            const gUserAv = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RANDOM")
                .setTitle(`🌎🔎 ${gUser.username}`)
                .setDescription(`[${languages(guild, "AVATAR_C")}](${avatar}) ${languages(guild, "AV_C2")}`)
                .setImage(await avatar)
            const authorAv = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setTitle(`🔍${message.author.username}`)
                .setColor("RANDOM")
                .setDescription(`[${languages(guild, "AVATAR_C")}](${avatar2}) ${languages(guild, "AV_C")}`)
                .setImage(await avatar2)
            pages = [gUserAv, authorAv]
            page(message, pages)    
        } else if(member){
            const avatar2 = message.author.avatarURL({dynamic: true, size: 2048, format: 'png'})
            const avatar = member.user.avatarURL({dynamic: true, size: 2048, format: 'png'})
            const memberAv = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RANDOM")
                .setTitle(`🔎 ${member.user.username}`)
                .setDescription(`[${languages(guild, "AVATAR_C")}](${avatar}) ${languages(guild, "AV_C2")}`)
                .setImage(await avatar)
            const authorAv = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setTitle(`🔍${message.author.username}`)
                .setColor("RANDOM")
                .setDescription(`[${languages(guild, "AVATAR_C")}](${avatar2}) ${languages(guild, "AV_C")}`)
                .setImage(await avatar2)
            pages = [memberAv,authorAv]
            page(message, pages)
        } else if(!member && !gUser) {
            const avatar = message.author.avatarURL({dynamic: true, size: 2048, format: 'png'})
            const authorAv = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RANDOM")
                .setTitle(`🔍${message.author.username}`)
                .setDescription(`[${languages(guild, "AVATAR_C")}](${avatar}) ${languages(guild, "AV_C")}`)
                .setImage(await avatar)
            message.reply(authorAv)
            return
        }
    }
}