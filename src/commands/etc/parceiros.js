const languages = require('../../util/languages/languages')
const { MessageEmbed } = require('discord.js')

module.exports = {
    run: async(client, message, args) => {
        if(message.author.bot) return
        const { guild } = message

        const embed = new MessageEmbed()
            .setTitle(`${languages(guild, 'PT_C')}`)
            .setColor('RANDOM')
            .setDescription(`${languages(guild, 'PT_C2')}`)
            .setImage('https://i.pinimg.com/originals/5a/ef/de/5aefde279b57693ef2a1ca146ec8b415.gif')
            .addFields(
                {
                    name: 'Músicas:',
                    value: '[DezuHub](https://www.youtube.com/channel/UC272c7Ff3InctEIcp-oNz_g)'
                },
                {
                    name: 'Streams:',
                    value: '[izGohi](https://www.twitch.tv/izgohi)\n[CamaradaEd](https://www.twitch.tv/camaradaed)'
                }
            )
        message.channel.send(embed)
    }, aliases: ['partners', 'sponsors'], description: 'Parceiros do Bot!'
}