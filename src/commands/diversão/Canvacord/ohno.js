const cvs = require('canvacord')
const { MessageAttachment } = require('discord.js')
const languages = require('../../../util/languages/languages')

module.exports = {
    aliases: [],
    description: 'Change my mind meme',
    run: async(client, message,args) => {
        const { guild } = message
        if(!args[0]) return message.channel.send(`${languages(guild, 'CV_C')}`)
        else {
            
            const ohno = await cvs.Canvas.ohno(args.join(' '))
            let attachment = new MessageAttachment(ohno, "Oh-no,-this-is-stupid.jpg")
            message.channel.send(attachment)
        }
    }
}