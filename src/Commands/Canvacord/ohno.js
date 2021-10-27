const 
    cvs = require('canvacord'),
    { MessageEmbed } = require('discord.js'),
    {errorHandle} = require("@configs/other/errorHandle"),
    lang = require('@lang');
module.exports = {
    aliases: [],
    description: 'Change my mind meme',
    run: async(client, messageCreate ,args) => {
        const { author } = messageCreate
        
        try {
            if(!args[0]) return message.channel.send(`${lang(author, 'CV_C')}`)
            else {
                const 
                    ohno = await cvs.Canvas.ohno(args.join(' ')),
                    attachEmbed = new MessageEmbed()
                    .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                    .setImage("attachment://file.jpg")
                    .setColor("RANDOM")
                messageCreate.reply({embeds: [attachEmbed], files: [ohno]})
            }
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }
    }
}