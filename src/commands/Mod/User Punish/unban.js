const { MessageEmbed } = require("discord.js")
const languages = require('../../../util/languages/languages')

module.exports = {
    aliases: ['ub'],
    description: 'Para banir um usuário',
    run: async(client, message, args) => {
        const {guild} = message
        perm = ["BAN_MEMBERS"]
        if(!message.member.hasPermission(perm)) {
            const noPerm = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "noperm"))
                .addFields(
                    {name: `${languages(guild, "noperm2")}`,value: `${languages(guild, "noperm3")} \`${perm}\``}
                )
            message.reply(noPerm); return
        } else if(!message.guild.me.hasPermission(perm)) {
            const noPerm = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "nobotperm"))
                .addFields(
                    {name: `${languages(guild, "noperm2")}`,value: `${languages(guild, "noperm3")} \`${perm}\``}
                )
            message.reply(noPerm); return
        }
        if(!args[0]) {
            if(args[0] === undefined) args[0] = languages(guild, "noreason")
            const noMember = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "nomemb"))
                .addFields(
                    {name: languages(guild, "nomemb2"),value: `\`${args[0]}\``},
                    {name: languages(guild, "ncreate3"),value: languages(guild, "ubUsage")}
                )
            message.reply(noMember); return
        } 
        let reason = args.slice(1).join(' ')
        try {
            let bannedMember = await guild.members.unban(args[0], `${reason ? reason: languages(guild, "noreason")}`)
                const sucess = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("GREEN")
                .setDescription(languages(guild, "UB"))
                .addFields(
                    {name: languages(guild, "UB2"), value: `\`${bannedMember.tag}\``},
                    {name: languages(guild, "UB3"), value: `\`${reason ? reason: languages(guild, "noreason")}\``}
                )
                .setFooter(`${languages(guild, "UB4")} ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
            message.reply(sucess)
        } catch (error) {
            const err = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(`${languages(guild, "UBE")}\n\n${languages(guild, "UBE2")}`)
            message.reply(err); return
        }
        
    }
}