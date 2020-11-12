const { MessageEmbed } = require('discord.js')
const languages = require('../../util/languages/languages')

module.exports = {
    run: (client, message, args) => {
        if(message.author.bot) return;
        const { guild } = message
        const embed = new MessageEmbed()
            .setDescription(`${languages(guild, 'VT_C')}`)
            .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
            .addFields(
                {
                    name: 'top.gg:',
                    value: `[${languages(guild, 'VT_C2')}](https://top.gg/bot/762077336812126228)`
                },
                {
                    name: 'Discord Bot List:',
                    value: `[${languages(guild, 'VT_C2')}](https://discord.ly/apple-pie)`
                }
            )
            .setColor('RANDOM')
            .setFooter(`${languages(guild, 'VT_C3')}`)
        message.channel.send(embed)
    },
    aliases: ['votar'],
    description: 'Votem em mim no top.gg!'
}
