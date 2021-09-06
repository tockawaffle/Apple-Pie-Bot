const { MessageEmbed } = require("discord.js")
const {selectRandomImage, selectRandomQuotes} = require("../../Configs/Commands/Roleplay/kiss"); const {errorHandle} = require("@configs/other/errorHandle")
const lang = require("@lang")
module.exports = {
    aliases: [],
    run: async(client, messageCreate, args) => {
        const {author} = messageCreate
        try {
            const mentionedMember = messageCreate.mentions.users.first()
            const kissEmbed = new MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(author.username, author.displayAvatarURL())
                .setDescription(`${await selectRandomQuotes(author, mentionedMember)}`)
                .setImage(await selectRandomImage())
                
            return messageCreate.reply({embeds: [kissEmbed]})
        } catch (error) {
            errorHandle(messageCreate, author, error)
        }

    }
}