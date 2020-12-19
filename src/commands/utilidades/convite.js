const { MessageEmbed } = require('discord.js')
const languages = require('../../util/languages/languages')
const pageEmbed = require('discord.js-pagination') 

module.exports = {
    run: (client, message, args) => {
        if(message.author.bot) return;
        const { guild } = message

        const apple = client.user
        const initial = new MessageEmbed()
            .setDescription(`Hello! Thank you for considering voting on me!`)
            .setAuthor(apple.username, apple.avatarURL())
            .addFields(
                {
                    name: `Here you can find where to vote on me!`,
                    value: `[Click Here](https://www.applepiebot.xyz/votes)`
                }
            )
            .setColor('RANDOM')
        message.reply(initial)
    },
    aliases: ['cvt', 'invite'],
    description: ''
}
