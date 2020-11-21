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
                const ytb = await cvs.Canvas.youtube({username: target.username, content: args.join(' '), avatar: target.avatarURL({format: 'jpg'})})
                let attachment = new MessageAttachment(ytb, "phub_comment.jpg")
                message.channel.send(attachment)
            } else{
                const ytb = await cvs.Canvas.youtube({username: message.author.username, content: args.join(' '), avatar: message.author.avatarURL({format: 'jpg'})})
                let attachment = new MessageAttachment(ytb, "phub_comment.jpg")
                message.channel.send(attachment)
            }

        }
    }
}