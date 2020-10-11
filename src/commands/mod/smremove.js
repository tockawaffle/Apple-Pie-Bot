const { MessageEmbed } = require("discord.js")

module.exports = {
    run: async(client, message, args) => {

        if(!message.member.hasPermission('MANAGE_CHANNELS', 'ADMINISTRATOR')) {
            return message.reply('Fufufu, parece que você não tem permissão para isso ' + process.env.SMUG)
        }

        const {MessageEmbed} = require('discord.js');

        const {guild} = message
        const embed = new MessageEmbed()
            .setTitle('Ação: Retirada de Slowmode')
            .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setDescription('Slowmode foi retirado em todos os chats!')
            .setColor('RANDOM')
        message.channel.send(embed)
        
        message.guild.channels.cache.forEach(channels => {
            if(channels.type === 'text') {
                channels.setRateLimitPerUser(0)
            }
        })        

    },
    aliases: ['smr'],
    description: 'Remover o slowmode!'
}

require('dotenv').config()