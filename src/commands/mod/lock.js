module.exports = {
    run: async(args, message, client) => {

        const {MessageEmbed} = require('discord.js');
        const {guild} = message
        
        if(!message.guild.me.hasPermission('ADMINISTRATOR')) return message.author.send('Hey! Não sei o que está acontecendo para você utilizar o comando de lockdown, mas antes, me dê a permissão de Administrador!(Caso não dê, o comando não funciona!)\nE por favor, após, retire a mesma para meu funcionamento!') + message.author.send('https://i.pinimg.com/originals/46/30/84/463084cec82eb48db4d4d64becefdfe4.gif')
        if(message.author.bot) return;
        if(message.member.hasPermission('MANAGE_CHANNELS')) {
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
        if(!message.member.hasPermission('MANAGE_CHANNELS')) {
            return message.reply('Hey! você não tem permissão para usar o lockdown!')
        }
    },
    aliases: ['l'],
    description: 'Tranca '
}