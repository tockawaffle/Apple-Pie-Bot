const { MessageEmbed } = require('discord.js')
const languages = require('../../languages/languages')

module.exports = {
    run: (client, message, args) => {
        if(message.author.bot) return;
        const { guild } = message
        const embed = new MessageEmbed()
            .setDescription(`[${languages(guild, 'VT_C')}](https://top.gg/bot/762077336812126228) ${languages(guild, 'VT_C2')}`)
            .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
            .setColor('RANDOM')
            .setFooter(`${languages(guild, 'VT_C3')}`)
        message.channel.send(embed)
    },
    aliases: ['votar'],
    description: 'Votem em mim no top.gg!'
}
