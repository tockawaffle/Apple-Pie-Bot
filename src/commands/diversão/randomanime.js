const { MessageEmbed } = require('discord.js')

module.exports = {
    aliases: ['rda'],
    description: 'Um gerador de garotas de anime com borgars',
    run: async(client, message, args) => {
        const rAnime = require('random-anime')
        const sfwAnime = rAnime.anime()
        const embed = new MessageEmbed()
            .setImage(sfwAnime)
            .setColor('RANDOM')
            .setFooter(`Isnt this cute? Hehe!`)
        message.reply(embed)
    }
}