
require('dotenv').config()
module.exports = {
    run: async(client, message, args) => {

        const languages = require('../../util/languages/languages')

        const { MessageEmbed } = require('discord.js');
        const { guild } = message;
        const moment = require('moment')
        const owner = client.users.cache.get('723185654044950539')
        const created = moment(client.user.createdAt).locale('pt-br').format('l')

        const embed = new MessageEmbed()
            .setAuthor(`${guild.name}`, owner.avatarURL({ dynamic: true }))
            .setDescription(`${languages(guild, 'BF_S')}`)
            .setThumbnail(client.user.avatarURL({dynamic: true}))
            .setColor("E7B985")
            .addField(`${languages(guild, 'BF_C')}`, client.user.username +``)
            .addField(`${languages(guild, 'BF_C2')}`, owner.tag)
            .addField(`${languages(guild, 'BF_C3')}`, created)
            .addField(`${languages(guild, 'BF_C4')}`, `[${languages(guild, 'BF_C5')}](https://github.com/The-Crow-pleb/Apple-Pie-Bot)`)
            .addField(`${languages(guild, 'BF_C6')}`, `[${languages(guild, 'BF_C7')}](https://twitter.com/matchavi)`)
        message.channel.send(embed);
    },
    aliases: ['bi', 'bf'],
    description: 'Minha descrição'
}