const { MessageEmbed} = require("discord.js");
require('dotenv').config();

module.exports = {
    run: async(client, message) => {

        if(message.author.bot) return;

        if(!message.member.hasPermission('MANAGE_CHANNELS', 'ADMINISTRATOR')) {
            return message.reply('Hmmm, você não tem permissão para isso! ' + process.env.SHRUG)
        }
        const {MessageEmbed} = require('discord.js')
        var args = message.content.substr(1).split(/ +/);

        if(args[1]){

            const {guild} = message
            const embed = new MessageEmbed()
                .setTitle('Ação: Slowmode.')
                .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                .setThumbnail(guild.iconURL({ dynamic: true }))
                .setDescription('Slowmode foi adicionado em todos os chats!')
                .addFields(
                    {
                        name: `O slowmode foi adicionado com a espera de`,
                        value: `${args[1]}s!`
                    }
                )
                .setColor('RANDOM')
                .setFooter('Se quiser retirar o slowmode, use o comando -smr, ou o mesmo comando mas com um 0 na frente!')
            message.channel.send(embed)
            message.guild.channels.cache.forEach(channels => {
                if(channels.type === 'text') {
                    channels.setRateLimitPerUser(args[1])
                }
            })
        } else {
            message.reply('Hey, especifique um número! (Entre segundos)')
        }
    },
    aliases: ['sm', 'slow', 'smd'],
    description: 'Slowmode'
}