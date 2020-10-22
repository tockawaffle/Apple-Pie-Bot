module.exports = {
    run: async(client, message, args) => {
        const { MessageEmbed } = require('discord.js')
        const { guild } = message;
        const kaguya = client.users.cache.get('465578457951109160')

        if(message.author.bot) return;
        try{
            if(message.author.id !== kaguya.id) {
                return message.author.send(`Haha! Por essa você não esperava, não é?\nSó a ${kaguya.username} pode invocar esse comando!`)
            }
            const embed = new MessageEmbed()
                .setAuthor(`${kaguya.username}`, kaguya.avatarURL({dynamic: true}))
                .setTitle('Yo, coisinha fofa')
                .setDescription('Espero que tenha tido a curiosidade para ter chegado até aqui')
                .addFields(
                    {
                        name: 'Hmmmm, eu não sei se tenho muito para te dizer, já que você é a pessoa mais sincera e fofa que eu já conheci.',
                        value: 'Mas posso dizer, você realmente conseguiu me aguentar durante esse tempo todo, chega até a ser surpreendente, sabia? São poucos os que conseguem'
                    },
                    {
                        name: 'Eu fiquei ruim de escrever textos, e disso eu sei, me desculpe, ok?',
                        value: 'Essa mensagem vai ser enviada no seu privado porquê eu acho que é melhor (e mais interessante) assim, não acha?'
                    },
                    
                )
                .setImage('https://i.pinimg.com/originals/3a/fc/18/3afc18a6111ab4df5b5ca6caafb307a9.gif')
                .setColor('87CEFA')
                .setFooter('Eu te amo uwu')
            message.author.send(embed);

        }catch(err) {
            console.log(err)
        }

    }, aliases: ['Gabby'], description: 'Kaguya Command'
}   