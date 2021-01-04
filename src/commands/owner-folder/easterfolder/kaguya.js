const { MessageEmbed } = require('discord.js')
const page = require('discord.js-pagination')
module.exports = {
    run: async(client, message, args) => {

        const kaguya = client.users.cache.get(`${process.env.ID}`)
        
        if(message.author.id !== kaguya.id) {
            return
        }
        const primeiro = new MessageEmbed()
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
        const segundo = new MessageEmbed()
            .setAuthor(`${kaguya.username}`, kaguya.avatarURL({dynamic: true}))
            .setTitle('Hoje é dia 03/01/2021')
            .setDescription('Eu espero que você leia isso alguma hora')
            .addFields(
                {
                    name: "Eu ainda não sou bom em escrever textos, é até um pouco agonizante isso, sabia?",
                    value: "Eu queria poder escrever algo bonito para você, para te deixar alegre e melhor do que você pode estar se sentindo agora, eu me sinto extremamente culpado por ter que deixar a sua amizade, sinto que não é justo, me sinto culpado por ter que deixar você, até porquê eu ainda te amo, e não acho que vá deixar disso a um tempo"
                },
                {
                    name: "Me desculpa por te deixar, eu não sei quanto tempo você pode acabar demorando para chegar aqui, mas uma hora sei que você vai chegar.",
                    value: "Eu te amo, Kaguya, eu realmente te amo, muito, com todas as minhas forças, e quero que você fique bem e consiga passar todas as coisas de ruim que te acontecem, até porque, diferente de mim, você é extremamente forte, você é amada por bastante gente, mesmo que não perceba, você é extremamente admiravel, eu te admiro.\nMe desculpa, tá bom? Eu te amo."
                }
            )
            .setColor('87CEFA')
            .setImage('https://steamuserimages-a.akamaihd.net/ugc/849342434360323885/56B9F0D5A0AEFB23EB8C95CBFCE527A4E25731B3/')
        message.author.send(primeiro)
        message.author.send(segundo)
        

    }, aliases: ['Gabby'], description: 'Kaguya Command'
}   