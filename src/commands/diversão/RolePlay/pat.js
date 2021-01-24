const { MessageEmbed } = require("discord.js");
const languages = require('../../../util/languages/languages')

module.exports = {
    run: async(client, message, args) => {

        const me = message.mentions.has(client.user);
        const member = message.mentions.members.first()
        const {guild} = message

        const pats = require('../../../configs/comandos/pats/pat')
        const random = pats[Math.floor(Math.random() * pats.length)]
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
                .setTitle(`${languages(guild, 'PAT_C')}`)
                .setDescription(`${message.author.username} ${languages(guild, 'PAT_C2')} ${process.env.E1}`)
                .setImage('https://static.wixstatic.com/media/8b2700_a86b83043ff343e6869cdb84de70a28e~mv2.gif')
                .setColor('RANDOM')
            message.channel.send(embed)
        }else if (member && !me) {
            const embed = new MessageEmbed()
                .setTitle(`${languages(guild, 'PAT_C4')}`)
                .setDescription(`${message.author.username} ${languages(guild, 'PAT_C5')} ${member.user.username}!`)
                .setImage(await random)
                .setColor('RANDOM')
            message.channel.send(embed)
        } 
    
    }, aliases: ['headpat', 'carinho'], description: 'Faz carinho na cabeça de alguém!'
}