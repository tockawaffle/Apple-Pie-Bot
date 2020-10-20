const { MessageEmbed } = require('discord.js')

module.exports = {
    run: (client, message, args) => {
        if(message.author.bot) return;
        const { guild } = message
        const embed = new MessageEmbed()
            .setDescription('Olá, [este](https://discord.com/oauth2/authorize?client_id=762077336812126228&scope=bot&permissions=2112351350) é o convite que me fará entrar em seu servidor!')
            .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
            .setColor('RANDOM')
            .setFooter('Não me dê a permissão de Administrador!')
            message.channel.send(embed)
    },
    aliases: ['cvt'],
    description: ''
}
