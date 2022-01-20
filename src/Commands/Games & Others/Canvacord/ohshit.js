const 
    { MessageEmbed } = require('discord.js'),
    {errorHandle} = require("@configs/other/errorHandle"),
    cvs = require('canvacord');
module.exports = {
    aliases: [],
    description: 'Change my mind meme',
    run: async(client, messageCreate,args) => {

        const { author } = messageCreate

        try {
            const 
                target = messageCreate.mentions.users.first() || messageCreate.author,
                avatar = target.avatarURL({format: 'jpg'}) 
                
            const 
                ohshit = await cvs.Canvas.shit(avatar),
                attachEmbed = new MessageEmbed()
                    .setAuthor({name: author.username, iconURL: author.displayAvatarURL({dynamic: true})})
                    .setImage("attachment://file.jpg")
                    .setColor("RANDOM")
            await messageCreate.reply({embeds: [attachEmbed], files: [ohshit]})            
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }
    }
}