const {MessageEmbed} = require('discord.js');
require('dotenv').config

module.exports = {
    run: async(client, message, args) => {

        if(message.guild.me.hasPermission('ADMINISTRATOR')) {
            message.author.send('Por favor, retire minhas permissões de Administrador!\nÉ para um melhor funcionamento, agradeço!')
            message.author.send('https://i.pinimg.com/originals/c5/59/fd/c559fd9d70a229df3100c6fe1d1b3811.gif')
        }
        if(message.author.bot) return;
        if(!message.member.hasPermission('ADMINISTRATOR')) {
            return message.reply('Você pode ser moderador, ou algo do tipo, mas só quem tem a permissão de Administrador pode retirar o lockdown!')
        }
        
        const {guild} = message
        const embed = new MessageEmbed()
            .setTitle('Ação: Lockdown Retirado!')
            .setDescription('O servidor saiu do lockdown!')
            .addField('Todos os canais foram desbloqueados', ('São tempos dificeis, não são?'))
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