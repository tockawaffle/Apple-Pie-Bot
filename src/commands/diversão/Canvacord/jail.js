const cvs = require('canvacord')
const { greyscale } = require('canvacord/src/Canvacord')
const { MessageAttachment, MessageEmbed } = require('discord.js')
const languages = require('../../../util/languages/languages')
module.exports = {
    aliases: [],
    description: 'Jail Image',
    run: async(client, message, args) => {

        const {guild} = message

        const target = message.mentions.users.first() || message.author
        const avatar = target.avatarURL({format: 'jpg'})
        let greyscale = args[1]
        if(!message.mentions.users.first()) {
            greyscale = args[0]
        }
        if(args[1] === 'yes') {
            greyscale = true
        } else if(args[1] === 'no') {
            greyscale = false
        } else if(!greyscale) {
            greyscale = false
        }
        const facepalm = await cvs.Canvas.jail(avatar, greyscale)
        let attachment = new MessageAttachment(facepalm, "jailyou.jpeg")
        message.channel.send(attachment)

    }
}