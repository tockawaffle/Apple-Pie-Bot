const { MessageEmbed } = require("discord.js");
module.exports = (client, member, message, data) => {
    const {MessageEmbed} = require('discord.js')
    const channel = member.guild.channels.cache.find(x => x.name === 'bem-vindo')
    if(!channel) return;
    const embed = new MessageEmbed()
        .setThumbnail(member.user.avatarURL())
        .setTitle(`${member.user.tag} seja bem-vindo ao servidor!`)
        .setDescription('Espero que goste de sua estadia aqui!')
        .setColor('RANDOM')
        .setFooter('Trate de ler as regras, caso não leia, no futuro você estará em meu forninho hehe')
        .setImage('https://i.pinimg.com/originals/b0/de/02/b0de026a12e20137a654b5e2e65e2aed.gif')
    channel.send(embed)
}