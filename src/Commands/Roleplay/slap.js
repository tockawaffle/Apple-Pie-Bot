const 
    { MessageEmbed } = require("discord.js"),
    {selectRandomImage} = require("@configs/Roleplay/slap"),
    {errorHandle} = require("@configs/other/errorHandle"),
    {checkGuild} = require("@configs/other/checkGuild"),
    lang = require("@lang");
module.exports = {
    aliases: [],
    run: async(client, messageCreate, args) => {
        const 
            {author} = messageCreate,
            verify = await checkGuild(messageCreate, author, true);
        if(verify !== true) return 
        
        try {
            const mentionedMember = messageCreate.mentions.users.first()
            const kissEmbed = new MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(author.username, author.displayAvatarURL())
                .setDescription(`${author.username} ${lang(author, "slap")} ${mentionedMember.username}`)
                .setImage(selectRandomImage())
                
            return messageCreate.reply({embeds: [kissEmbed]})
        } catch (error) {
            errorHandle(messageCreate, author, error)
        }
    }
}