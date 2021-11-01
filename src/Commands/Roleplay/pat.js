const 
    { MessageEmbed } = require("discord.js"),
    {selectRandomImage} = require("@configs/Roleplay/pat"),
    {errorHandle} = require("@configs/other/errorHandle"),
    {checkGuild} = require("@configs/other/checkGuild"),
    lang = require("@lang");
module.exports = {
    aliases: [],
    run: async(client, messageCreate, args) => {
        const 
            {author} = messageCreate
            verify = await checkGuild(messageCreate, author, true)
        if(verify.verify !== true) return 
        
        try {
            const 
                mentionedMember = messageCreate.mentions.users.first()
                kissEmbed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setAuthor(author.username, author.displayAvatarURL())
                    .setDescription(`${author.username} ${lang(author, "pat")} ${mentionedMember.username}`)
                    .setImage(selectRandomImage())
            return messageCreate.reply({embeds: [kissEmbed]})
        } catch (error) {
            errorHandle(messageCreate, author, error)
        }

    }
}