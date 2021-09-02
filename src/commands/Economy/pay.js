const userSchema = require('../../configs/db/schemas/userSchema')
const {MessageEmbed} = require('discord.js')
const lang = require('../../util/languages/languages')

module.exports = {
    aliases: [], description: '',
    run: async(client, message, args) => {

        try {
            const {author: {id: userID}, guild, mentions: {members: target}} = message
            const filter = await userSchema.findOne({_userID: userID})
            const receiverTag = target.first()
            const receiver = await userSchema.findOne({_userID: receiverTag.id})
            message.channel.startTyping()
            if(!filter) {
                await userSchema.findOneAndUpdate({_userID: userID}, {_userID: userID,registered: 'yes', botPayout: 'yes',amountCoins: 1500}, {upsert: true})
                const redoEmbed = new MessageEmbed()
                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                    .setColor("RANDOM")
                    .setDescription(`\`\`\`${lang(guild, "pay_redo")}\`\`\``)
                message.channel.stopTyping()
                return message.reply(redoEmbed)
            } else if(!receiver) {
                await userSchema.findOneAndUpdate({_userID: target.id}, {_userID: target.id,registered: 'yes', botPayout: 'yes',amountCoins: 1500}, {upsert: true})
                const redoEmbed = new MessageEmbed()
                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                    .setColor("RANDOM")
                    .setDescription(`\`\`\`${lang(guild, "pay_redo")}\`\`\``)
                message.channel.stopTyping()
                return message.reply(redoEmbed)
            }  else {
                const amount = args[1]
                if(!receiverTag || receiverTag.id === userID) {
                    message.channel.stopTyping()
                    return message.reply("Sorry, seems like you either mentioned yourself or mentioned no one, please re-do the command.")
                } else if(!amount || isNaN(amount)) {
                    message.channel.stopTyping()
                    return message.reply("Sorry, you either did not set an amount to pay that user or the amount you gave is not an actual number.")
                } else if(filter.amountCoins < amount) {
                    message.channel.stopTyping()
                    return message.reply("You do not have that amount of money to give someone!")
                } else {
                    const mathThingy = Math.round(filter.amountCoins - amount)
                    const updateReceived = parseInt(amount) + receiver.amountCoins
                    if(filter.amountAlreadyPaid) {
                        message.channel.stopTyping()
                        const updatePaid = parseInt(amount) + filter.amountAlreadyPaid
                        await userSchema.findOneAndUpdate({_userID: userID}, {_userID: userID, amountCoins: mathThingy, amountAlreadyPaid: updatePaid}, {upsert: true})
                        await userSchema.findOneAndUpdate({_userID: receiverTag.id}, {_userID: receiverTag.id, amountCoins: updateReceived}, {upsert: true})

                        const paySucessEmbed = new MessageEmbed()
                            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                            .setColor("RANDOM")
                            .setDescription(`${message.author.username+ ', ' + lang(guild, "payS") + ' ' + amount + ' ' +lang(guild,"coins") + ' ' + lang(guild, "pay_2") + ' ' + receiverTag.user.username }`)
                        return message.reply(paySucessEmbed)
                    } else {
                        message.channel.stopTyping()
                        await userSchema.findOneAndUpdate({_userID: userID}, {_userID: userID, amountCoins: mathThingy, amountAlreadyPaid: amount}, {upsert: true})
                        await userSchema.findOneAndUpdate({_userID: target.id}, {_userID: target.id, amountCoins: updateReceived}, {upsert: true})
                        const paySucessEmbed = new MessageEmbed()
                            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                            .setColor("RANDOM")
                            .setDescription(`${message.author.username+ ', ' + lang(guild, "payS") + ' ' + amount + ' ' +lang(guild,"coins") + ' ' + lang(guild, "pay_2") + ' ' + receiverTag.user.username }`)
                        return message.reply(paySucessEmbed)
                    }
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