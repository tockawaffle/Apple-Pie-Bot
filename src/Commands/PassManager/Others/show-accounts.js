const
    {MessageEmbed} = require("discord.js"),
    {checkGuild} = require("@configs/other/checkGuild"),
    passManSchema = require("@db/schemas/passManagerSchema"),
    {errorHandle} = require("@configs/other/errorHandle"),
    moment = require("moment"),
    lang = require("@lang")

module.exports = {
    aliases: ["sacc"],
    description: "Shows your accounts",
    category: "Security",
    run: async(client, messageCreate, args) => {
        
        try {
            const
            {author} = messageCreate,
            passSchema = await passManSchema.findOne({_id: author.id}),
            verified = await checkGuild(messageCreate, author, false)
            if(verified === true) return messageCreate.react("❌")
            if(!passSchema) {
                const noAccEmbed = new MessageEmbed()
                    .setAuthor({name: author.username, iconURL: author.displayAvatarURL({dynamic: true})})
                    .setDescription(lang(author, "sacc-noacc"))
                    .setColor("DARK_RED")
                return messageCreate.reply({embeds: [noAccEmbed]})
            } else {
                if(!passSchema.accounts) {
                    const noAccEmbed = new MessageEmbed()
                        .setAuthor({name: author.username, iconURL: author.displayAvatarURL({dynamic: true})})
                        .setDescription(lang(author, "sacc-noacc"))
                        .setColor("DARK_RED")
                    return messageCreate.reply({embeds: [noAccEmbed]})
                } else {
                    const accEmbed = new MessageEmbed()
                        .setAuthor({name: author.username, iconURL: author.displayAvatarURL({dynamic: true})})
                        .setDescription(`${lang(author, "sacc-list")}\n${passSchema.accounts.map(acc => `\`\`\`${acc.accName} - ${moment(acc.date).utc().format("L")}\`\`\``).join("\n")}`)
                        .setColor("RANDOM")
                    return messageCreate.reply({embeds: [accEmbed]})
                }
            }
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }
        
    }
}