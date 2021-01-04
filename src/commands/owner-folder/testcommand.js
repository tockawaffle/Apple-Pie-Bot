const languages = require('../../util/languages/languages')
const {MessageEmbed} = require('discord.js');
const moment = require('moment')

module.exports = {
    run: async(client, message, args) => {
        const owner = client.users.cache.get('723185654044950539')

        if(message.author.id === owner.id) {

            const {guild} = message;
    
            try{
                const botinfo = guild.members.cache.filter(member => member.user.bot).size
                const memberinfo = guild.members.cache.filter(member => !member.user.bot).size
                const created = moment(guild.createdAt).locale('pt-br').format('LLLL')
                const created2 = moment(guild.owner.user.createdAt).locale('pt-br').format('LLLL')
    
                const testEmbed = new MessageEmbed()
                    .setAuthor(`${guild.name}`, guild.iconURL({dynamic: true}))
                    .setTitle('Isso é um teste, por favor, ignore caso tenha invocado o comando por engano')
                    .setDescription(`Seu nome é ${message.author.username} e o meu é ${client.user.username}`)
                    .addFields(
                        //Server Info
                        {
                            name: `O nome do criador da guilda é:`,
                            value: guild.owner.user.tag,
                            inline: true
                        },
                        {
                            name: `A guilda foi criada em:`,
                            value: created,
                            inline: true
                        },
                        {
                            name: `Esse comando foi invocado na guilda '${guild.name}'`,
                            value: `A mesma tem ${botinfo} bots e ${memberinfo} Membros (Não bots)`,
                            inline: true
                        }
                    )
                    //Guild Owner Info
                    .addFields(
                        {
                            name: 'A conta do criador da guilda foi criada em:',
                            value: `${created2}`,
                            inline: true
                        },
                        {
                            name: 'O UserID do criador da guilda é:',
                            value: `${guild.owner.user.id}.`,
                            inline: true
                        },
                        {
                            name: 'Ele está com a atividade:',
                            value: `${guild.owner.user.presence.activities}.`,
                            inline: true
                        }
                    )
                    //Client Info
                    .addField(
                        {
                            name: 'Meu nome é:',
                            value: `${client.user.username}`,
                            inline: true
                        },
                        {
                            name: 'Meu criador se chama:',
                            // value: `${client.user.owner.username}`
                        }
                    )
                    .addField('Você pode ignorar agora', 'Caso tenha sido invocado por engano, entre no [servidor de suporte](https://discord.gg/sGgzNQ6) e relate!')
                    .setFooter('Esse comando é para testes e alguns erros ou linhas que não fazem sentido podem existir!')
                    .setColor('ff0202')
                message.channel.send(testEmbed)
            }catch(err) {
                console.log(err)
                message.author.send(err)
            }
        }
        
    }, aliases: ['cmdtst'], description: 'cmdtest>'
}
