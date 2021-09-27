const cvs = require('canvacord')
const { MessageEmbed } = require('discord.js')
const {errorHandle} = require("@configs/other/errorHandle")
module.exports = {
    aliases: [],
    description: 'facepalm Image',
    run: async(client, messageCreate, args) => {

        try {
            const { author } = messageCreate
            const target = messageCreate.mentions.users.first() || messageCreate.author
            const facepalm = await cvs.Canvas.facepalm(target.avatarURL({format: 'jpg'}))
            const attachEmbed = new MessageEmbed()
                .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                .setImage("attachment://file.jpg")
                .setColor("RANDOM")
            messageCreate.reply({embeds: [attachEmbed], files: [facepalm]})            
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }
    }
}