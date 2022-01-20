const 
    { errorHandle } = require("@configs/other/errorHandle"),
    { MessageEmbed } = require('discord.js'),
    lang = require('@lang'),
    cvs = require('canvacord');
module.exports = {
    aliases: [],
    description: 'Change my mind meme',
    run: async(client, messageCreate) => {
        const { author } = messageCreate
        try {
            const args = messageCreate.content.split(' ');
            args.shift()
            if(!args[0]) return messageCreate.reply({content: `${lang(author, 'CV_C')}`})
            else {
                const 
                    changemymind = await cvs.Canvas.changemymind(args.join(' ')),
                    attachEmbed = new MessageEmbed()
                        .setAuthor({name: author.username, iconURL: author.displayAvatarURL({dynamic: true})})
                        .setImage("attachment://file.jpg")
                        .setColor("RANDOM")
                await messageCreate.reply({embeds: [attachEmbed], files: [changemymind]})
            } 
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }
    }
}