const cvs = require('canvacord')
const { MessageAttachment } = require('discord.js')
const languages = require('../../../util/languages/languages')

module.exports = {
    aliases: [],
    description: 'Change my mind meme',
    run: async(client, message,args) => {
        const { guild } = message
        const target = message.mentions.users.first() || message.author
        const avatar = target.avatarURL({format: 'jpg'}) 
            
        const ohshit = await cvs.Canvas.shit(avatar)
        let attachment = new MessageAttachment(ohshit, "OHSHIT.jpg")
        message.channel.send(attachment)
    }
}