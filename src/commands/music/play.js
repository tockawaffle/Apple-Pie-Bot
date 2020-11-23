const { MessageEmbed } = require("discord.js");
const languages = require('../../util/languages/languages')

module.exports = {
    aliases: [],
    description: '',
    run: async(client, message) => {

        const args = message.content.split(' ')
        args.shift(' ')



        if (!message.member.voice.channel) {
            const noChannel = new MessageEmbed()
                .setAuthor(`${message.guild.name}`, message.guild.iconURL({dynamic: true}))
                .setDescription(`You're not in a channel, join one first!`)
                .setColor('RED')
            message.reply(noChannel)
            return
        }

        if (!args[0]) {
            const noArgs = new MessageEmbed()
                .setDescription(`You need to provide a link first!`)
                .setColor('RED')
            message.reply(noArgs)
            return
        }

        client.player.play(message, args.join(" "), message.member)
        
    }
}   