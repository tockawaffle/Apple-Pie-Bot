module.exports = {
    run: async(args, message, client) => {

        const {MessageEmbed} = require('discord.js');
        const {guild} = message
        
        if(message.author.bot) return;

        if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
            return message.channel.send("Eu não tenho permissão para isso. Habilite a permissão 'Gerenciar Canais' em meu cargo para que eu possa concluir o comando!");
        }

        if(message.member.hasPermission('MANAGE_CHANNELS')) {
            
            //Since I don't request the Administrator permissions, I won't be able to talk in any of the channels (Because of how permissions in the API works), that's the reason to the code above.
            //Yes, I could request the permissions, but it's unecessary since none of my commands need it in order to work
            const ca = message.channel
            ca.createOverwrite(message.guild.me, {SEND_MESSAGES: true})

            const embed = new MessageEmbed()
                .setTitle('Ação: LOCKDOWN')
                .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                .setThumbnail(guild.iconURL({ dynamic: true }))
                .setDescription(`O server ${guild.name} entrou em lockdown!`)
                .addField('Todos os canais foram bloqueados', `Por favor, não esqueça de utilizar -unlock!`)
                .addField('Utilize o unlock **assim que puder**', 'Caso contrário, não funcionarei direito e as permissões de canais vão ficar todas bagunçadas!')
                .setColor('RANDOM')
            message.channel.send(embed)

            const embed1 = new MessageEmbed()
                .setTitle('Ação: LOCKDOWN')
                .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                .setThumbnail(guild.iconURL({ dynamic: true }))
                .setDescription(`O server ${guild.name} entrou em lockdown!`)
                .addField('Todos os canais foram bloqueados', `Por favor, não esqueça de utilizar -unlock!`)
                .addField('Utilize o unlock **assim que puder**', 'Caso contrário, não funcionarei direito e as permissões de canais vão ficar todas bagunçadas!')
                .addField('Ou então, me dê permissões em todos os canais!', 'Siga as instruções do [GIF](https://i.pinimg.com/originals/3c/87/e4/3c87e4afe7fe0d834454e43cfd10c190.gif)(Ou aqui) abaixo:')
                .setImage('https://i.pinimg.com/originals/3c/87/e4/3c87e4afe7fe0d834454e43cfd10c190.gif')
                .setColor('RANDOM')
            message.author.send(embed1) //I know. There is better ways to this, but anyways, this is the easiest way I found, I don't know how I'd change the code to make it better.

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