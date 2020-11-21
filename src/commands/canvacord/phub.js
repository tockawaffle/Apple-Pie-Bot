const cvs = require('canvacord')
const { MessageAttachment } = require('discord.js')
const languages = require('../../util/languages/languages');

module.exports = {
    aliases: [],
    description: 'Pornhub Comment',
    run: async(client, message) => {
        const { guild } = message
        const args = message.content.split(' ');
        args.shift()
        if(!args[0]) return message.channel.send(`${languages(guild, 'CV_C2')}`)
        else {
            const target = message.mentions.users.first()
            if(target) {
                args.shift()
                const phub = await cvs.Canvas.phub({username: target.username, message: args.join(' '), image: target.avatarURL({format: 'jpg'})})
                let attachment = new MessageAttachment(phub, "phub_comment.jpg")
                message.channel.send(attachment)
            } else{
                const phub = await cvs.Canvas.phub({username: message.author.username, message: args.join(' '), image: message.author.avatarURL({format: 'jpg'})})
                let attachment = new MessageAttachment(phub, "phub_comment.jpg")
                message.channel.send(attachment)
            }

        }
    }
}