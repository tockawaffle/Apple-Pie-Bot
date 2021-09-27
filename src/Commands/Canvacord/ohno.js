const cvs = require('canvacord')
const { MessageEmbed } = require('discord.js')
const lang = require('@lang')

module.exports = {
    aliases: [],
    description: 'Change my mind meme',
    run: async(client, messageCreate ,args) => {
        const { author } = messageCreate
        if(!args[0]) return message.channel.send(`${lang(author, 'CV_C')}`)
        else {
            const ohno = await cvs.Canvas.ohno(args.join(' '))
            const attachEmbed = new MessageEmbed()
                .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                .setImage("attachment://file.jpg")
                .setColor("RANDOM")
            messageCreate.reply({embeds: [attachEmbed], files: [ohno]})
        }
    }
}