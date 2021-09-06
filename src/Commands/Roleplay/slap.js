const { MessageEmbed } = require("discord.js")
const {selectRandomImage} = require("../../Configs/Commands/Roleplay/slap"); const {errorHandle} = require("@configs/other/errorHandle")
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
                .setDescription(`${author.username} ${lang(author, "slap")} ${mentionedMember.username}`)
                .setImage(await selectRandomImage())
                
            return messageCreate.reply({embeds: [kissEmbed]})
        } catch (error) {
            errorHandle(messageCreate, author, error)
        }
    }
}