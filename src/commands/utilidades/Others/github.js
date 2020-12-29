const languages = require('../../../util/languages/languages')

module.exports = {
    run: async(client, message, args) => {

        const { MessageEmbed } = require('discord.js');
        const { guild } = message
        const owner = client.users.cache.get('723185654044950539')

        const embed = new MessageEmbed()
            .setAuthor(`${guild.name}`, owner.avatarURL({ dynamic: true }))
            .setDescription(`${languages(guild, 'G_C')}`)
            .setThumbnail(client.user.avatarURL({dynamic: true}))
            .setColor("E7B985")
            .addField(`${languages(guild, 'G2_C')}`, `${languages(guild, 'G3_C')} [${languages(guild, 'G3_C_2')}](https://github.com/The-Crow-pleb/Apple-Pie-Bot)`)  
        message.channel.send(embed)  
    },
    aliases: ['gt', 'gthb'],
    description: 'Meu repositório no github!'
}