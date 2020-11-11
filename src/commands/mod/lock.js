module.exports = {
    run: async(args, message, client) => {

        const languages = require('../../util/languages/languages')
        const {MessageEmbed} = require('discord.js');
        const {guild} = message
        
        if(message.author.bot) return;

        if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
            return message.channel.send(`${languages(guild, 'L_C')}`);
        }

        if(message.member.hasPermission('MANAGE_CHANNELS')) {

            const embed = new MessageEmbed()
                .setTitle(`${languages(guild, 'L_C1')}`)
                .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                .setThumbnail(guild.iconURL({ dynamic: true }))
                .setDescription(`${languages(guild, 'L_C2')}`)
                .addField(`${languages(guild, 'L_C3')}`, `${languages(guild, 'L_C4')}`)
                .setColor('RANDOM')
            message.channel.send(embed)

            message.guild.channels.cache.forEach(async (channel, id) => {
                await channel.createOverwrite(channel.guild.roles.everyone, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
                });
            });
        };
        if(!message.member.hasPermission('MANAGE_CHANNELS')) {
            return message.reply(`${languages(guild, 'L_C7')}`)
        }
    },
    aliases: ['l'],
    description: 'Tranca todos os canais de um servidor.'
}