const cvs = require('canvacord')
const { MessageEmbed } = require('discord.js')

module.exports = {
    aliases: [],
    description: 'Change my mind meme',
    run: async(client, messageCreate,args) => {

        const { author } = messageCreate
        const target = messageCreate.mentions.users.first() || messageCreate.author
        const avatar = target.avatarURL({format: 'jpg'}) 
            
        const ohshit = await cvs.Canvas.shit(avatar)
        const attachEmbed = new MessageEmbed()
            .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
            .setImage("attachment://file.jpg")
            .setColor("RANDOM")
        messageCreate.reply({embeds: [attachEmbed], files: [ohshit]})
    }
}