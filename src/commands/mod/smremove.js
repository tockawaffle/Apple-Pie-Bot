const { MessageEmbed } = require("discord.js")

module.exports = {
    run: async(client, message, args) => {

        if(message.author.bot) return;

        if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
            return message.channel.send("Eu não tenho permissão para isso. Habilite a permissão 'Gerenciar Canais' em meu cargo para que eu possa concluir o comando!");
        }

        if(!message.member.hasPermission('MANAGE_CHANNELS')) {
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