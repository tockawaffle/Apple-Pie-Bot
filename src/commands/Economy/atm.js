const userSchema = require('../../configs/db/schemas/userSchema')
const {MessageEmbed} = require('discord.js')
const lang = require('../../util/languages/languages')

module.exports = {
    aliases: ['banco', 'saldo'], description: '',
    run: async(client, message, args) => {

        try {
            const {author: {id: userID}, guild} = message
            const filter = await userSchema.findOne({_userID: userID})
            message.channel.startTyping()
            if(!filter) {
                await userSchema.findOneAndUpdate({_userID: userID}, {_userID: userID,registered: 'yes', botPayout: 'yes',amountCoins: 1500}, {upsert: true})
                const atmEmbed = new MessageEmbed()
                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                    .setColor("RANDOM")
                    .setDescription(`\`\`\`${lang(guild, "atm") + ' ' + '1500' + ' ' + lang(guild, "atm_2")}\`\`\``)
                message.channel.stopTyping()
                return message.reply(atmEmbed)
            } else {
                const atmEmbed = new MessageEmbed()
                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                    .setColor("RANDOM")
                    .setDescription(`${lang(guild, "atm") + ' ' + filter.amountCoins + ' ' + lang(guild, "atm_2")}`)
                if(!filter.amountAlreadyPaid && !filter.amountBetted) {
                    message.channel.stopTyping()
                    return message.reply(atmEmbed)
                } else if(!filter.amountAlreadyPaid && filter.amountBetted) {
                    atmEmbed.setDescription(`\`\`\`${lang(guild, "atm") + ' ' + filter.amountCoins + ' ' + lang(guild, "atm_2")}\n\n${lang(guild, "atm_bet") + ' ' + filter.amountBetted + ' ' + lang(guild, "coins")}\`\`\``)
                    message.channel.stopTyping()
                    return message.reply(atmEmbed)
                } else if(filter.amountAlreadyPaid && !filter.amountBetted) {
                    atmEmbed.setDescription(`\`\`\`${lang(guild, "atm") + ' ' + filter.amountCoins + ' ' + lang(guild, "atm_2")}\n\n${lang(guild, "atm_paid") + ' ' + filter.amountAlreadyPaid + ' ' + lang(guild, "coins") + ' '  + lang(guild, "atm_paid2")}\`\`\``)
                    message.channel.stopTyping()
                    return message.reply(atmEmbed)
                } else {
                    atmEmbed.setDescription(`\`\`\`${lang(guild, "atm") + ' ' + filter.amountCoins + ' ' + lang(guild, "atm_2")}\n\n${lang(guild, "atm_paid") + ' ' + filter.amountAlreadyPaid + ' ' +  lang(guild, "coins")+ ' '  + lang(guild, "atm_paid2")}\n\n${lang(guild, "atm_bet") + ' ' + filter.amountBetted + ' ' + lang(guild, "coins")}\`\`\``)
                    message.channel.stopTyping()
                    return message.reply(atmEmbed)
                }
            }
        } catch (error) {
            const errorEmbed = new MessageEmbed()
                .setColor('#ffe135')
                .setAuthor(message.author.username, message.author.displayAvatarURL({dynamyc: true}))
                .setDescription(`Oops, Something went wrong!:\n\n\`\`\`diff\n +Error: ${error}\`\`\`\nIf this error persists, please, open an issue at my GitHub page.`) 
            message.reply(errorEmbed)
            message.channel.stopTyping()
        }
        

    }
}