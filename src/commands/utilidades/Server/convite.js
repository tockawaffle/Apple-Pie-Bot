const { MessageEmbed } = require('discord.js')
const languages = require('../../../util/languages/languages')

module.exports = {
    run: (client, message, args) => {
        const { guild } = message

        const apple = client.user
        if(message.author.bot) return;
        const initial = new MessageEmbed()
            .setDescription(`${languages(guild, "I_C")}`)
            .setAuthor(apple.username, apple.avatarURL())
            .addFields(
                {
                    name: `${languages(guild, "I2_C")}`,
                    value: `[${languages(guild, "BF_C5")}](https://www.applepiebot.xyz/invite-me)`
                }
            )
            .setFooter(`${languages(guild, "I3_C")}`)
            .setColor('RANDOM')
        message.reply(initial)
    },
    aliases: ['cvt', 'invite'],
    description: ''
}
