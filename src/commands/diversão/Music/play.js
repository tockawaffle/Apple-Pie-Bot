const { MessageEmbed } = require("discord.js");
const languages = require('../../../util/languages/languages')

module.exports = {
    aliases: [],
    description: '',
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

        if (!args[0]) {
            const noArgs = new MessageEmbed()
                .setDescription(`${languages(guild, 'PL_2')}!`)
                .setColor('RED')
            message.reply(noArgs)
            return
        }
        client.player.play(message, args.join(' '), true)
        
    }
}   