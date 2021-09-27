const cvs = require('canvacord')
const { MessageEmbed } = require('discord.js')
const lang = require('@lang')

module.exports = {
    aliases: [],
    description: 'Change my mind meme',
    run: async(client, messageCreate) => {
        const { author } = messageCreate
        const args = messageCreate.content.split(' ');
        args.shift()
        if(!args[0]) return messageCreate.reply({content: `${lang(author, 'CV_C')}`})
        else {
            
            const changemymind = await cvs.Canvas.changemymind(args.join(' '))
            const attachEmbed = new MessageEmbed()
                .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                .setImage("attachment://file.jpg")
                .setColor("RANDOM")
            messageCreate.reply({embeds: [attachEmbed], files: [changemymind]})
        }
    }
}