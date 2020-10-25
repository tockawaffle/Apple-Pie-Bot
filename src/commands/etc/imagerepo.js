module.exports = {
    run: async(client, message, args) => {
        const languages = require('../../languages/languages')
        const {MessageEmbed} = require('discord.js');
        const {guild} = message;
        const embed = new MessageEmbed()
            .setAuthor(`${guild.name}`, guild.iconURL({dynamic: true}))
            .setColor('RANDOM')
            .setTitle(`${languages(guild, 'IMG_RP')}`)
            .setDescription(`${languages(guild, 'IMG_RP2')} [Pinterest](https://pin.it/6ncJhjY)`)
            .addField(`${languages(guild, 'IMG_RP3')}`, `${languages(guild, 'IMG_RP4')}`)
        message.channel.send(embed)
    }, aliases: ['imgrp'], description: 'Repositório de Imagens'
}