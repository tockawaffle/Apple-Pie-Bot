const cvs = require('canvacord')
const { MessageEmbed } = require('discord.js')
const lang = require('@lang')
const {errorHandle} = require("@configs/other/errorHandle")
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
                const changemymind = await cvs.Canvas.changemymind(args.join(' '))
                const attachEmbed = new MessageEmbed()
                    .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                    .setImage("attachment://file.jpg")
                    .setColor("RANDOM")
                messageCreate.reply({embeds: [attachEmbed], files: [changemymind]})
            } 
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }
    }
}