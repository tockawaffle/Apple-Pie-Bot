const { MessageEmbed } = require("discord.js")
const languages = require('../../../util/languages/languages')

module.exports = {
    aliases: ['kc'],
    description: 'Para banir um usuário',
    run: async(client, message, args) => {
        const {guild} = message
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        perm = ["KICK_MEMBERS"]
        if(!message.member.hasPermission(perm)) {
            const noPerm = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "noperm"))
                .addFields(
                    {
                        name: `${languages(guild, "noperm2")}`,
                        value: `${languages(guild, "noperm3")} \`${perm}\``
                    }
                )
            message.reply(noPerm); return
        } else if(!message.guild.me.hasPermission(perm)) {
            const noPerm = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "nobotperm"))
                .addFields(
                    {
                        name: `${languages(guild, "noperm2")}`,
                        value: `${languages(guild, "noperm3")} \`${perm}\``
                    }
                )
            message.reply(noPerm); return
        }
        if(!member) {
            const noMember = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "nomemb"))
                .addFields(
                    {
                        name: languages(guild, "nomemb2"),
                        value: `\`${args[0]}\``
                    }
                )
            message.reply(noMember); return
        } else if(!member.bannable){
            const noPerm = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "nobotperm"))
                .addFields(
                    {name: languages(guild, "unkck"), value: `\`${member.user.username}\``},
                    {name: languages(guild, "reason"), value: languages(guild, "unbm2")}
                )
            message.reply(noPerm); return
        }

        let reason = args.slice(1).join(' ')
        const sucess = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setColor("GREEN")
            .setDescription(languages(guild, "B"))
            .addFields(
                {name: languages(guild, "B2"), value: `\`${member.user.username}\``},
                {name: languages(guild, "B3"), value: `\`${reason ? reason: languages(guild, "noreason")}\``}
            )
            .setFooter(`${languages(guild, "B4")} ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
        message.reply(sucess)
        await member.kick(`${reason ? reason: languages(guild, "noreason")}`)
    }
}