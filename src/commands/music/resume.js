const { MessageEmbed } = require("discord.js")
const languages = require('../../util/languages/languages')

module.exports = {
    aliases: [],
    description: 'Resume uma música',
    run: async(client, message) => {

        const {guild} = message
        if (!message.member.voice.channel) {
            const noChannel = new MessageEmbed()
                .setAuthor(`${message.guild.name}`, message.guild.iconURL({dynamic: true}))
                .setDescription(`${languages(guild, 'PL')}`)
                .setColor('RED')
            message.reply(noChannel)
            return
        }

        if (!client.player.getQueue(message)) return message.reply(`${languages(guild, 'LPNQ')}`)

        client.player.resume(message);
        const resume = new MessageEmbed()
            .setDescription(`${languages(guild, "RS")} ${client.player.getQueue(message).playing.title}`)
            .setFooter(`${languages(guild, "RS_2")}: ${message.author.username}`)
            .setAuthor(`${message.guild.name}`, message.guild.iconURL({dynamic: true}))
            .setColor('RANDOM')
        message.reply(resume)
    }
}