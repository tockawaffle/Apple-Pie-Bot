module.exports = {
    run: async(args, message, client) => {

        const {MessageEmbed} = require('discord.js');
        const {guild} = message
        
        if(message.author.bot) return;
        if(message.member.hasPermission('ADMINISTRATOR')) {
            const embed = new MessageEmbed()
                .setTitle('Ação: LOCKDOWN')
                .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                .setThumbnail(guild.iconURL({ dynamic: true }))
                .setDescription('O server entrou em lockdown!')
                .addField('Todos os canais foram bloqueados', `Por favor, contatem ${message.author} para tirar o lockdown!`)
                .setColor('RANDOM')
            message.channel.send(embed)

            message.guild.channels.cache.forEach(async (channel, id) => {
                await channel.createOverwrite(channel.guild.roles.everyone, {
                SEND_MESSAGES: false,
                MANAGE_MESSAGES: false,
                ADD_REACTIONS: false
                });
            });
        };
        if(!message.member.hasPermission('ADMINISTRATOR')) {
            return message.reply('Hey! você não tem permissão para usar o lockdown!')
        }
    },
    aliases: ['l'],
    description: 'Tranca '
}