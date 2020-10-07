const { description } = require('./userinfo');

module.exports = {
    run: async(client, message, args) => {

        const { MessageEmbed } = require('discord.js');
        const { guild } = message
        const owner = client.users.cache.get('723185654044950539')

        const embed = new MessageEmbed()
            .setAuthor(`${guild.name}`, owner.avatarURL({ dynamic: true }))
            .setDescription("Deseja saber como eu sou feita? Eh...")
            .setThumbnail(client.user.avatarURL({dynamic: true}))
            .setColor("E7B985")
            .addField('H-hey! Tome cuidado com o que for ver, está bem?...', 'Você pode me ver por completo [aqui](https://github.com/The-Crow-pleb/Apple-Pie-Bot)')  
        message.channel.send(embed)  
    },
    aliases: ['gt', 'gthb'],
    description: 'Meu repositório no github!'
}