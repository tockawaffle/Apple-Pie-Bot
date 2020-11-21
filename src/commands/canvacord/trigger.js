const cvs = require('canvacord')
const { MessageAttachment } = require('discord.js')

module.exports = {
    aliases: [],
    description: 'Triggered Image',
    run: async(client, message) => {
        const args = message.content.split(' ');
        args.shift()
        const target = message.mentions.users.first() || message.author
            const trigger = await cvs.Canvas.trigger(target.avatarURL({format: 'jpg'}))
            let attachment = new MessageAttachment(trigger, "triggered.gif")
            message.channel.send(attachment)
    }
}