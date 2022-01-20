const { MessageEmbed } = require("discord.js")

async function getBalance(messageCreate) {

    const 
        {author, guild} = messageCreate,
        lang = require("@lang"),
        guildSchema = require("@db/schemas/guildSchema"),
        checker = await guildSchema.findOne({_id: guild.id});
    if(checker) {
        const find = await guildSchema.findOne({_id: guild.id}, {dataOfEconomy: {$elemMatch: {userID: author.id}}})
        const money = find.dataOfEconomy[0].balance

        const moneyEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor({name: author.username, url: author.displayAvatarURL({dynamic: true})})
            .setDescription(lang(author, "econ-balance").replace("{balance}", money).replace("{coinName}", checker.coinName))
        return messageCreate.reply({embeds: [moneyEmbed]})
        
    } else throw new Error()
    
}
module.exports = {getBalance}