const { MessageEmbed } = require("discord.js");
const languages = require('../../../util/languages/languages')

module.exports = {
    run: async(client, message, args) => {

        const { guild } = message

        const g1 = 'https://i.pinimg.com/originals/b6/d8/a8/b6d8a83eb652a30b95e87cf96a21e007.gif'
        const g2 = 'https://i.pinimg.com/originals/07/b4/51/07b4516d50406b4a320269d514876170.gif'
        const g3 = 'https://i.pinimg.com/originals/93/28/74/9328743378801a4c048e43526decfc0e.gif'
        const g4 = 'https://i.pinimg.com/originals/70/0b/b2/700bb2cc9429e2bab1da767b4486f4e1.gif'
        const g5 = 'https://i.pinimg.com/originals/6a/01/9d/6a019dee74f0ef1ed8315db7dba972f7.gif'
        const g6 = 'https://i.pinimg.com/originals/1c/f8/4b/1cf84bf514d2abd2810588caf7d9fd08.gif'
        const simg = [g1, g2, g3, g4, g5, g6]
        const random = simg[Math.floor(Math.random() * simg.length)]
 
        const me = message.mentions.has(client.user)
        const member = message.mentions.members.first() || message.guild.members.cache.get(args)

        if(me) {
            const embed = new MessageEmbed()
                .setTitle(`${languages(guild, 'S_C')}`)
                .setDescription(`${message.author.username} ${languages(guild, 'S_C2')}`)
                .setImage('https://i.pinimg.com/originals/52/c4/bf/52c4bfbe3ae9fbfcbc0e2975e78b481c.gif')
                .setFooter(`${languages(guild, 'S_C3')}`)
                .setColor('E7B985')
            message.channel.send(embed)
        }
        try{
            if(me) return
            if(member) {
                const embed = new MessageEmbed()
                    .setTitle(`${languages(guild, 'S_C4')}`)
                    .setDescription(`${message.author.username} ${languages(guild, 'S_C5')} ${member.user.username} `)
                    .setImage(random)
                    .setColor('RANDOM')
                    .setFooter(`${languages(guild, 'S_C3')}`)
                message.channel.send(embed)
            }
        }catch(err) {
            console.log(err)
        }

    }, aliases: ['tapa'], description: 'Dá um tapa em alguém'
}