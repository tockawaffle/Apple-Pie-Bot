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
        if(message.mentions.users.first()) {
            args.shift()
        }
        if(!args[0]) return message.channel.send(`${languages(guild, 'CV_C')}`)
        else {
            const opinion = await cvs.Canvas.opinion(avatar, args.join(' '))
            let attachment = new MessageAttachment(opinion, "respect-your-opinion.jpg")
            message.channel.send(attachment)
        }
    }
}