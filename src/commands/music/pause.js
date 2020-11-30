const { MessageEmbed } = require("discord.js")
const languages = require('../../util/languages/languages')

module.exports = {
    aliases: [],
    description: 'Pausa uma música',
    run: async(client, message, args) => {
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

        client.player.pause(message);
        const paused = new MessageEmbed()
            .setDescription(`${languages(guild, "PS")} ${client.player.getQueue(message).playing.title}`)
            .setFooter(`${languages(guild, "PS_2")} ${message.author.username}`)
            .setAuthor(`${message.guild.name}`, message.guild.iconURL({dynamic: true}))
            .setColor('RANDOM')
        message.reply(paused)
    }
}