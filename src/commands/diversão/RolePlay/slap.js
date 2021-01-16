const { MessageEmbed } = require("discord.js");
const languages = require('../../../util/languages/languages')

module.exports = {
    run: async(client, message, args) => {

        const { guild } = message
        const slap = require('../../../../configs/comandos/slap/slap')
        const random = slap[Math.floor(Math.random() * slap.length)]
 
        const me = message.mentions.has(client.user)
        const member = message.mentions.members.first() || message.guild.members.cache.get(args)

        if (!args[0]) {
            if(args[0] === undefined) args[0] = languages(guild, "noreason")
            const noMember = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "nomemb"))
                .addFields(
                    {
                        name: languages(guild, "nomemb2"),
                        value: `\`${args[0]}\``
                    },
                    {
                        name: languages(guild, "ncreate3"),
                        value: languages(guild, "hUsage")
                    }
                )
            message.reply(noMember); return 
        }
        if(me) {
            const embed = new MessageEmbed()
                .setTitle(`${languages(guild, 'S_C')}`)
                .setDescription(`${message.author.username} ${languages(guild, 'S_C2')}`)
                .setImage('https://static.wixstatic.com/media/8b2700_bb185bb328034daaa9a82c972ef63aa4~mv2.gif')
                .setColor('E7B985')
            message.channel.send(embed)
        }else if(member && !me) {
            const embed = new MessageEmbed()
                .setTitle(`${languages(guild, 'S_C4')}`)
                .setDescription(`${message.author.username} ${languages(guild, 'S_C5')} ${member.user.username} `)
                .setImage(await random)
                .setColor('RANDOM')
            message.channel.send(embed)
        }

    }, aliases: ['tapa'], description: 'Dá um tapa em alguém'
}