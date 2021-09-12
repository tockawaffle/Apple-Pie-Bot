const {errorHandle} = require("@configs/other/errorHandle")
const {translateThis} = require("@configs/other/translateThis")
const lang = require("@lang")
const { MessageEmbed } = require("discord.js")
const languages = require("../../../Configs/Commands/Texts/languages")
module.exports = {
    aliases: ["tradutor", "traduzir"], 
    run: async(client, messageCreate, args) => {
        
        const {author} = messageCreate
        try {
            const translated = await translateThis(messageCreate, args.join(" "))
            const translatedEmbed = new MessageEmbed()
                .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                .setColor("RANDOM")
                .setDescription(`${lang(author, "result")}\`\`\`${lang(author, "input")} ${args.join(" ")}\n\n${lang(author, "output")} ${translated[0].text}\n\n${lang(author, "raw")} ${translated[0].rawText}\n\n${lang(author, "pron")} ${translated[0].pronunciation}\n\n${lang(author, "auto")} ${translated[0].autoCorrected}\`\`\``)
            return messageCreate.reply({embeds: [translatedEmbed]})
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }

    }
}