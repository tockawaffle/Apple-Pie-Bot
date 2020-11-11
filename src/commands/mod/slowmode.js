const { MessageEmbed} = require("discord.js");
const languages = require('../../util/languages/languages')

module.exports = {
    run: async(client, message) => {

        const { guild } = message

        if(message.author.bot) return;

        if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
            return message.channel.send(`${languages(guild, 'L_C')}`);
        }

        if(!message.member.hasPermission('MANAGE_CHANNELS')) {
            return message.reply(`${languages(guild, 'SM_C')} ` + process.env.SHRUG)
        }
        const {MessageEmbed} = require('discord.js')
        var args = message.content.substr(1).split(/ +/);

        if(args[1]){

            const {guild} = message
            const embed = new MessageEmbed()
                .setTitle(`${languages(guild, 'SM1_C')}`)
                .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                .setThumbnail(guild.iconURL({ dynamic: true }))
                .setDescription(`${languages(guild, 'SM2_C')}`)
                .addFields(
                    {
                        name: `${languages(guild, 'SM3_C')}`,
                        value: `${args[1]}s!`
                    }
                )
                .setColor('RANDOM')
            message.channel.send(embed)
            message.guild.channels.cache.forEach(channels => {
                if(channels.type === 'text') {
                    channels.setRateLimitPerUser(args[1])
                }
            })
        } else {
            message.reply(`${languages(guild, 'SM4_C')}`)
        }
    },
    aliases: ['sm', 'slow', 'smd'],
    description: 'Slowmode'
}