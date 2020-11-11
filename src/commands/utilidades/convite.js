const { MessageEmbed } = require('discord.js')
const languages = require('../../util/languages/languages')

module.exports = {
    run: (client, message, args) => {
        if(message.author.bot) return;
        const { guild } = message
        const embed = new MessageEmbed()
            .setDescription(`[${languages(guild, 'I_C')}](https://discord.com/oauth2/authorize?client_id=762077336812126228&scope=bot&permissions=277212190) ${languages(guild, 'I2_C')}`)
            .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
            .setColor('RANDOM')
            .setFooter(`${languages(guild, 'I3_C')}`)
        message.channel.send(embed)
    },
    aliases: ['cvt', 'invite'],
    description: ''
}
