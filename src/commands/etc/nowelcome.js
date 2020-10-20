module.exports = {
    run: async(client, message, args, channel) => {

        if(message.member.hasPermission('MANAGE_CHANNELS')) {
            try{

                const {MessageEmbed} = require('discord.js')
                const {guild} = message;

                const nwEmbed = new MessageEmbed()
                    .setTitle(`As boas-vindas foram desativas em: ${guild.name}`)
                    .setDescription(`A ação foi feita por: ${message.author.username}`)
                    .setColor('ff0202')
                message.author.send(nwEmbed)

                const wc = message.guild.channels.cache.find(x => x.name === 'bem-vindo')
                wc.createOverwrite(client.user, {SEND_MESSAGES: false})
    
            }catch(error) {
                console.log(error)
                message.channel.send(`Ops, algo de errado aconteceu, entre no [servidor de suporte](https://discord.gg/sGgzNQ6) para obter ajuda!`)
            }
        }else{
            message.reply(`Minhas boas vindas são tão ruins assim?\nE você não tem permissões para fazer isso!`)
            message.channel.send(process.env.SADY)
        }
    },
    aliases: ['nw'],
    description: 'Retira as boas vindas do bot'
}