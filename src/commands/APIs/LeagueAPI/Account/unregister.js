const { MessageEmbed } = require("discord.js");
const leagueSchema = require('../../../../configs/db/schemas/leagueSchema')
const lang = require('../../../../util/languages/languages')

module.exports = {
    description: '', aliases: ['unreg', 'unrg'],
    run: async(client, message, args) => {

        try {
            const {author, guild} = message
            const leagueCheck = await leagueSchema.findOne({_id: author.id})
        if(!leagueCheck) {
            const notReg = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RANDOM")
                .setTitle(lang(guild, "lacc-not-reg"))
                .setDescription(lang(guild, "lacc-not-reg-desc").replace("<prefix>", message.prefix))
                .setImage(await 'https://cdn.discordapp.com/attachments/828401264961912893/865711767597482024/download.png')
            return message.reply(notReg)
        } else {
            await leagueSchema.findOneAndRemove({_id: author.id}, {_id: author.id})
            const unreg = new MessageEmbed()
                .setTitle(lang(guild, "lunrg-sccs"))
                .setColor("RANDOM")
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            message.reply(unreg)
            return message.channel.stopTyping()
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