const { MessageEmbed } = require('discord.js')

module.exports = {
    aliases: ['animensfw'],
    description: 'Um gerador de garotas de anime com borgars',
    run: async(client, message, args) => {
        message.delete()
        if(!message.channel.nsfw) return message.reply('Not nsfw channel uwu').then((msg) => {msg.delete({timeout: 5000})})
        const rAnime = require('random-anime')
        const nsfwAnime = rAnime.nsfw()
        const embed = new MessageEmbed()
            .setImage(nsfwAnime)
            .setColor('RANDOM')
            .setFooter(`perv;`)
        message.reply(embed)
    }
}