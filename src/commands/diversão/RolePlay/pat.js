const { MessageEmbed } = require("discord.js");
const languages = require('../../../util/languages/languages')

module.exports = {
    run: async(client, message, args) => {

        const me = message.mentions.has(client.user);
        const member = message.mentions.members.first() || message.guild.members.cache.get(args)
        const {guild} = message

        const p1 = 'https://i.pinimg.com/originals/48/d6/75/48d67569d3dd681bc5b638b4783ee13e.gif'
        const p2 = 'https://i.pinimg.com/originals/75/9a/3e/759a3e4200a0f4c292ebf3fd84cf25e1.gif'
        const p3 = 'https://i.pinimg.com/originals/38/db/ba/38dbba01df34822bfe0a286e861d9b3a.gif'
        const p4 = 'https://i.pinimg.com/originals/7a/ac/01/7aac01fe264581179622ef6df4a08d45.gif'
        const p5 = 'https://i.pinimg.com/originals/48/97/73/4897734e420880998b7047a2432684e5.gif'
        const p6 = 'https://i.pinimg.com/originals/73/b2/7f/73b27f56e37fb332a884f7ea1f8fbc0c.gif'
        const images = [ p1, p2, p3, p4, p5, p6 ]
        const random = images[Math.floor(Math.random() * images.length)]

        if(me) {
            const embed = new MessageEmbed()
                .setTitle(`${languages(guild, 'PAT_C')}`)
                .setDescription(`${message.author.username} ${languages(guild, 'PAT_C2')} ${process.env.SRVC}`)
                .addField(`${languages(guild, 'PAT_C6')}`, `${languages(guild, 'PAT_C7')} ${process.env.BLUSHY4}`)
                .setImage('https://i.pinimg.com/originals/7a/69/f8/7a69f83c312d7711df38c0c115c889c3.gif')
                .setFooter(`${languages(guild, 'PAT_C3')}`)
                .setColor('RANDOM')
            message.channel.send(embed)
        }
        try{
            if(me) return
            if (member) {
                const embed = new MessageEmbed()
                    .setTitle(`${languages(guild, 'PAT_C4')}`)
                    .setDescription(`${message.author.username} ${languages(guild, 'PAT_C5')} ${member.user.username}!`)
                    .setImage(random)
                    .setFooter(`${languages(guild, 'PAT_C3')}`)
                    .setColor('RANDOM')
                message.channel.send(embed)
            }
        }catch(err) {
            console.log(err)
        }
        


    }, aliases: ['headpat', 'carinho'], description: 'Faz carinho na cabeça de alguém!'
}