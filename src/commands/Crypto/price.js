const { MessageEmbed } = require("discord.js")
const pages = require('discord.js-pagination')
const lang = require('../../util/languages/languages')
module.exports = {
    aliases: [],
    description: 'CryptoHelp',
    run: async(client, message, args) => {

        if(args.lenght > 2) return message.reply('no')
        const {guild} = message

        const crypto = client.crypto
        let currency = args[1]
        let coin = args[0]
        if(!currency) {
            const noCurrency = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setTitle(lang(guild, "crypt_curr"))
                .setColor('#ff0000')
            return message.reply(noCurrency)
        } else if (!coin) {
            const noCurrency = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setTitle(lang(guild, "crypt_curr"))
                .setColor('#ff0000')
            return message.reply(noCurrency)
        }
        currency.toLowerCase()
        let up = ' ' + currency.toUpperCase()
        let nano = await crypto.coins.markets({vs_currency: currency, ids: coin})
        const data = nano.data
        if(data.map(x => x.name).length === 0) {
            return message.reply(`**${coin.toUpperCase()}** ${lang(guild, "nac")}`).then(msg => msg.delete({timeout: 10000}))
        } else if(nano.success === true) {
            
            let amount = args[2]
            if(!amount) {
                return message.reply(`${lang(guild, "noAmount")}`).then(msg => msg.delete({timeout: 10000}))
            } else if(isNaN(amount)) {
                return message.reply(`**${amount.toUpperCase()}** ${lang(guild, "nan")}`).then(msg => msg.delete({timeout: 10000}))
            } else {
                let price = await data.map(x => x.current_price); let name = await data.map(x => x.name)
                const finalPrice = new MessageEmbed()
                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                    .setTitle(name)
                    .addFields(
                        {name: `📥 Input:`, value: `\`\`\`${price} (${name} price)\nX\n${amount} (What you inputted)\`\`\``},
                        {name: `📤 Output:`, value: `\`\`\`${price * amount + up}\`\`\``}
                    )
                    .setColor("RANDOM")
                    .setThumbnail(data.map(x => x.image).toString())
                message.reply(finalPrice)
            }
        }

    }
}