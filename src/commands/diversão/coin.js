const languages = require('../../util/languages/languages')

module.exports = {
    run: async(client, message, args) => {

        const { guild } = message

        const head = [`${languages(guild, 'COIN_C')}`, `${languages(guild, 'COIN_C2')}`]
        const random = head[Math.floor(Math.random() * head.length)]
        const rdmChoice = head[Math.floor(Math.random() * head.length)]

        message.reply(`${languages(guild, 'COIN')}`).then(() => {
            message.channel.awaitMessages(response => response.content === `${languages(guild, 'COIN_C')}` || response.content === `${languages(guild, 'COIN_C2')}`, {
                max: 1,
                time: 10000,
                errors: ['time'],
            }).then((collected) => {
                let response = collected.first().content.toLowerCase()
            if(response ==  `${languages(guild, 'COIN_C')}` && rdmChoice == `${languages(guild, 'COIN_C2')}`) {
                    message.channel.send(`${languages(guild, 'COIN2')}\n${languages(guild, 'COIN3')} ${rdmChoice}`)
                } else if( response == `${languages(guild, 'COIN_C2')}` && rdmChoice == `${languages(guild, 'COIN_C')}`) {
                    message.channel.send(`${languages(guild, 'COIN2')}\n${languages(guild, 'COIN3')} ${rdmChoice}`)
                } else if ( response === rdmChoice ) {
                    message.channel.send(`${languages(guild, 'COIN4')}`)
                }
            }).catch(() => {
            message.reply(`${languages(guild, 'COIN_ERR')}`)
        })
        })

        console.log(random)
    }, aliases: [], description: ''
}