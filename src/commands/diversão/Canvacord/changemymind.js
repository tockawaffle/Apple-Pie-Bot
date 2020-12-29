const cvs = require('canvacord')
const { MessageAttachment } = require('discord.js')
const languages = require('../../../util/languages/languages')

module.exports = {
    aliases: [],
    description: 'Change my mind meme',
    run: async(client, message) => {
        const { guild } = message
        const args = message.content.split(' ');
        args.shift()
        if(!args[0]) return message.channel.send(`${languages(guild, 'CV_C')}`)
        else {
            
            const changemymind = await cvs.Canvas.changemymind(args.join(' '))
            let attachment = new MessageAttachment(changemymind, "changing_your_mind.jpg")
            message.channel.send(attachment)
        }
    }
}