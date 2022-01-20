const 
    {errorHandle} = require("@configs/other/errorHandle"),
    {translateThis} = require("@configs/other/translateThis"),
    { MessageEmbed } = require("discord.js"),
    lang = require("@lang");

module.exports = {
    aliases: ["tradutor", "traduzir"], 
    description: "Translate a word or phrase",
    category: "Utilities",
    run: async(client, messageCreate, args) => {
        
        const {author} = messageCreate
        try {
            const 
                translated = await translateThis(messageCreate, args.join(" "))
                translatedEmbed = new MessageEmbed()
                    .setAuthor({name: author.username, iconURL: author.displayAvatarURL({dynamic: true})})
                    .setColor("RANDOM")
                    .setDescription(`${lang(author, "result")}\`\`\`${lang(author, "input")} ${args.join(" ")}\n\n${lang(author, "output")} ${translated[0].text}\n\n${lang(author, "raw")} ${translated[0].rawText}\n\n${lang(author, "pron")} ${translated[0].pronunciation}\n\n${lang(author, "auto")} ${translated[0].autoCorrected}\`\`\``)
            return await messageCreate.reply({embeds: [translatedEmbed]})
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }

    }
}