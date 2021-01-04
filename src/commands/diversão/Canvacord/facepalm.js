const cvs = require('canvacord')
const { MessageAttachment, MessageEmbed } = require('discord.js')
const languages = require('../../../util/languages/languages')
module.exports = {
    aliases: [],
    description: 'facepalm Image',
    run: async(client, message, args) => {

        const {guild} = message

        const target = message.mentions.users.first() || message.author
        const facepalm = await cvs.Canvas.facepalm(target.avatarURL({format: 'jpg'}))
        let attachment = new MessageAttachment(facepalm, "facepalm.jpeg")
        message.channel.send(attachment)

    }
}