require('dotenv').config()
module.exports = {
    run: async(client, message, args) => {

        const languages = require('../../languages/languages')

        const { MessageEmbed } = require('discord.js');
        const { guild } = message;
        const moment = require('moment')
        const owner = client.users.cache.get('723185654044950539')
        const created = moment(client.user.createdAt).locale('pt-br').format('l')

        const embed = new MessageEmbed()
            .setAuthor(`${guild.name}`, owner.avatarURL({ dynamic: true }))
            .setDescription("Você realmente quer saber sobre mim? Ehh..")
            .setThumbnail(client.user.avatarURL({dynamic: true}))
            .setColor("E7B985")
            .addField(`${languages(guild, 'BF_C')}`, client.user.username +`, ${languages(guild, 'BF_C2')}`)
            .addField(`${languages(guild, 'BF_C3')}`, owner.tag)
            .addField(`${languages(guild, 'BF_C4')}`, created)
            .addField(`${languages(guild, 'BF_C5')}`, `[${languages(guild, 'BF_C6')}](https://github.com/The-Crow-pleb/Apple-Pie-Bot)`)
            .addField(`${languages(guild, 'BF_C7')}`, `${languages(guild, 'BF_C8')}`)
        message.channel.send(embed);
        message.channel.send(`${languages(guild, 'BF_END')}` + process.env.BLUSHY)
    },
    aliases: ['bi', 'bf'],
    description: 'Minha descrição'
}
