const { MessageEmbed } = require("discord.js")
const lang = require('../../../util/languages/languages')
module.exports = {
    aliases:['btc'],
    description: 'Bitcoin',
    run: async(client, message, args) => {

        const {guild} = message

        const crypto = client.crypto; let currency = args[0]
        if(!currency) {
            const noCurrency = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setTitle(lang(guild, "crypt_curr"))
                .setColor('#ff0000')
            return message.reply(noCurrency)
        }
        currency.toLowerCase()
        let up = ' ' + currency.toUpperCase()
        let nano = await crypto.coins.markets({vs_currency: currency, ids: 'bitcoin'})

        if(nano.success === true) {
            let data = nano.data

            const nanoEmbed = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setTitle(`<:bitcoin:815670555797749800> Bitcoin ➪ ${up}`)
                .setColor('ORANGE')
                .addFields(
                    {name: lang(guild, "crypt_price"), value: `\`\`\`${data.map(x => x.current_price) + up}\`\`\``},
                    {name: lang(guild, "crypt_h24"), value: `\`\`\`${data.map(x => x.high_24h) + up}\`\`\``},
                    {name: lang(guild, "crypt_l24"), value: `\`\`\`${data.map(x => x.low_24h) + up}\`\`\``},
                    {name: lang(guild, "crypt_c24"), value: `\`\`\`${data.map(x => x.price_change_24h) + up}\`\`\``},
                    {name: lang(guild, "crypt_p24"), value: `\`\`\`${data.map(x => x.price_change_percentage_24h)}%\`\`\``},
                    {name: lang(guild, "crypt_API"), value: `\`\`\`${data.map(x => x.last_updated)}\`\`\``}
                )
            return message.reply(nanoEmbed)
        } else {
            let error = nano.data.error
            if(error === 'invalid vs_currency') error = `Invalid Currency: ${up}`
            const errorEmbed = new MessageEmbed()
                .setColor('#ff0000')
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setTitle(lang(guild, "crypt_err"))
                .addField(lang(guild, "crypt_err2"), `\`\`\`${error}\`\`\``)
            return message.reply(errorEmbed)
            
        }

    }
}