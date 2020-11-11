const {MessageEmbed} = require('discord.js');
require('dotenv').config
const languages = require('../../util/languages/languages')

module.exports = {
    run: async(client, message, args) => {

        if(message.author.bot) return;
        if(!message.member.hasPermission('MANAGE_CHANNELS')) {
            return message.reply(`${languages(guild, 'UL_C7')} `)
        }
        
        const {guild} = message
        const embed = new MessageEmbed()
            .setTitle(`${languages(guild, 'UL_C1')} `)
            .setDescription(`${languages(guild, 'UL_C2')} `)
            .addField(`${languages(guild, 'UL_C3')} `, (`${languages(guild, 'UL_C6')} `))
            .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
            .setThumbnail(guild.iconURL({ dynamic: true }))
        message.channel.send(embed);

        message.guild.channels.cache.forEach(async (channel, id) => {
            await channel.createOverwrite(channel.guild.roles.everyone, {
            SEND_MESSAGES: true,
            ADD_REACTIONS: true
            });
        });
    },
    aliases:['ul'],
    description: ''
}