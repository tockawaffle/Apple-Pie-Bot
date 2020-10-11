const {MessageEmbed} = require('discord.js');
require('dotenv').config

module.exports = {
    run: async(client, message, args) => {
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
            MANAGE_MESSAGES: true,
            ADD_REACTIONS: true
            });
        });
    },
    aliases:['ul'],
    description: ''
}