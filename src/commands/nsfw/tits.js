const languages = require('../../util/languages/languages')
const { MessageEmbed } = require('discord.js')

module.exports = {
    run: async(client, message, args) => {
        const { guild } = message;

        
        if(!message.channel.nsfw) {
            return message.reply('not a nsfw channel')
        } else {
            const embed = new MessageEmbed()
                .setImage('https://www.nsfwupload.com/images/2020/11/11/tt1.gif')
            message.reply(embed)
        }

    }, aliases: ['<Aliases>'], description: '<Descrição>'
}
