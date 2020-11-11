const { MessageEmbed } = require("discord.js")
const languages = require('../../util/languages/languages')

module.exports = {
    run: async(client, message, args) => {

        if(message.author.bot) return;

        if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
            return message.channel.send(`${languages(guild, 'L_C')}`);
        }

        if(!message.member.hasPermission('MANAGE_CHANNELS')) {
            return message.reply(`${languages(guild, 'SR_C')} ` + process.env.SMUG)
        }

        const {MessageEmbed} = require('discord.js');

        const {guild} = message
        const embed = new MessageEmbed()
            .setTitle(`${languages(guild, 'SR1_C')}`)
            .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setDescription(`${languages(guild, 'SR2_C')}`)
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