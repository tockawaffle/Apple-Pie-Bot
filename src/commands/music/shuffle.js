const { MessageEmbed } = require("discord.js")
const languages = require('../../util/languages/languages')

module.exports = {
    aliases: [],
    description: 'Randomiza a playlist',
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

        client.player.shuffle(message);

        const shuffled = new MessageEmbed()
            .setAuthor(`${message.guild.name}`, message.guild.iconURL({dynamic: true}))
            .setDescription(`${languages(guild, "SF")} ${client.player.getQueue(message).tracks.length} ${languages(guild, "SF_2")}`)
            .setColor('RANDOM')
        return message.channel.send(shuffled);
    
    }
}