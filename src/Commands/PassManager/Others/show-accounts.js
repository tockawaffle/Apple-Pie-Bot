const
    {MessageEmbed} = require("discord.js"),
    {checkGuild} = require("@configs/other/checkGuild"),
    passManSchema = require("@db/schemas/passManagerSchema"),
    moment = require("moment"),
    lang = require("@lang")

module.exports = {
    aliases: ["sacc"],
    run: async(client, messageCreate, args) => {
        
        const
            {author} = messageCreate,
            passSchema = await passManSchema.findOne({_id: author.id}),
            verified = await checkGuild(messageCreate, author, false)
        if(verified === true) return messageCreate.react("❌")
        if(!passSchema) {
            const noAccEmbed = new MessageEmbed()
                .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                .setDescription(lang(author, "sacc-noacc"))
                .setColor("#FF0000")
            return messageCreate.reply({embeds: [noAccEmbed]})
        } else {
            if(!passSchema.accounts) {
                const noAccEmbed = new MessageEmbed()
                    .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                    .setDescription(lang(author, "sacc-noacc"))
                    .setColor("#FF0000")
                return messageCreate.reply({embeds: [noAccEmbed]})
            } else {
                const accEmbed = new MessageEmbed()
                    .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                    .setDescription(`${lang(author, "sacc-list")}\n${passSchema.accounts.map(acc => `${acc.username} - ${moment(acc.date).utc()}`).join("\n")}`)
                    .setColor("#00FF00")
                return messageCreate.reply({embeds: [accEmbed]})
            }
        }
    }
}