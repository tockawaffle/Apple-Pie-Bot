module.exports = {
    run: async(client, message, args) => {
        console.log(args)
        const {MessageEmbed} = require('discord.js');
        const {guild} = message;
        const embed = new MessageEmbed()
            .setAuthor(`${guild.name}`, guild.iconURL({dynamic: true}))
            .setColor('RANDOM')
            .setTitle('Está curioso para saber de onde vem minhas imagens?')
            .setDescription('Pois bem! Todas elas vêm do [Pinterest](https://pin.it/6ncJhjY)')
            .addField('Tire proveito por enquanto!', 'Meu criador pretende tirar as imagens de lá e deixar as mesmas localmente!')
        message.channel.send(embed)
    }, aliases: ['imgrp'], description: 'Repositório de Imagens'
}