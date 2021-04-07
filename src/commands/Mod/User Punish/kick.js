const { MessageEmbed } = require("discord.js")
const languages = require('../../../util/languages/languages')

module.exports = {
    aliases: ['kc'],
    description: 'Para banir um usuário',
    run: async(client, message, args) => {
        const {guild} = message
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        perm = ["KICK_MEMBERS"]
        let reasoning;
        const other = [ "ADMINISTRATOR" || "KICK_MEMBERS" || "KICK_MEMBERS" || "BAN_MEMBERS" || "MANAGE_CHANNELS" || "MANAGE_GUILD"]
        if(!message.member.hasPermission(perm)) {
            const noPerm = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "noperm"))
                .addFields(
                    {name: `${languages(guild, "noperm2")}`,value: `${languages(guild, "noperm3")} \`${perm}\``}
                )
            message.reply(noPerm).then(msg => msg.delete({timeout: 10000})); return
        } else if(!message.guild.me.hasPermission(perm)) {
            const noPerm = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "nobotperm"))
                .addFields(
                    {name: `${languages(guild, "noperm2")}`,value: `${languages(guild, "noperm3")} \`${perm}\``}
                )
            message.reply(noPerm).then(msg => msg.delete({timeout: 10000})); return
        }
        
        if(!member) {
            const noMember = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "nomemb"))
                .addFields(
                    {name: languages(guild, "nomemb2"),value: `\`${args[0]}\``}
                )
            message.reply(noMember).then(msg => msg.delete({timeout: 15000})); return
        } else if(member.id === message.author.id) {
            const sameUser = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "same"))
            return message.reply(sameUser).then(msg => msg.delete({timeout: 10000}))
        } else if(member.id === guild.owner.id) {
            const owner = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "owner"))
                .addField(languages(guild, "owner2"), languages(guild, "owner3"))
            return message.reply(owner).then(msg => msg.delete({timeout: 10000}))
        } else if(!member.kickable){
            const noPerm = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "nobotperm"))
                .addFields(
                    {name: languages(guild, "unkck"), value: `\`${member.user.username}\``},
                    {name: languages(guild, "reason"), value: languages(guild, "unbm2")}
                )
            message.reply(noPerm).then(msg => msg.delete({timeout: 10000})); return
        } else if(message.member.roles.highest.position <= member.roles.highest.position && message.author.id !== message.guild.owner.id) {
            reasoning = languages(guild, "moreperms3")
            const hasPerm = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "moreperms"))
                .addFields(
                    {name: languages(guild, "moreperms2"), value: `\`\`\`${reasoning}\`\`\``}
                )
            return message.reply(hasPerm).then(msg => msg.delete({timeout: 10000}))
        } else if(member.hasPermission(other) && message.author.id !== message.guild.owner.id) {
            reasoning = languages(guild, "moreperms4")
            const hasPerm = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "moreperms"))
                .addFields(
                    {name: languages(guild, "moreperms2"), value: `\`\`\`${reasoning}: ${other}\`\`\``}
                )
            return message.reply(hasPerm).then(msg => msg.delete({timeout: 10000}))
        }

        let reason = args.slice(1).join(' ')
        const sucess = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setColor("GREEN")
            .setDescription(languages(guild, "K"))
            .addFields(
                {name: languages(guild, "K2"), value: `\`${member.user.username}\``},
                {name: languages(guild, "K3"), value: `\`${reason ? reason: languages(guild, "noreason")}\``}
            )
            .setFooter(`${languages(guild, "K4")} ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
        message.reply(sucess)
        member.kick(`${reason ? reason: languages(guild, "noreason")}`)
    }
}