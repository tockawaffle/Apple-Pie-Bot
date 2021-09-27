const cvs = require('canvacord')
const { MessageEmbed } = require('discord.js')
const lang = require('@lang')
const {errorHandle} = require("@configs/other/errorHandle")
module.exports = {
    aliases: [],
    description: 'Change my mind meme',
    run: async(client, messageCreate,args) => {
        
        const { author } = messageCreate

        try {
            const target = messageCreate.mentions.users.first() || messageCreate.author
            const avatar = target.avatarURL({format: 'jpg'})
            if(messageCreate.mentions.users.first()) { args.shift() }
            if(!args[0]) return messageCreate.channel.send(`${lang(author, 'CV_C')}`)
            else {
                const opinion = await cvs.Canvas.opinion(avatar, args.join(' '))
                const attachEmbed = new MessageEmbed()
                    .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                    .setImage("attachment://file.jpg")
                    .setColor("RANDOM")
                messageCreate.reply({embeds: [attachEmbed], files: [opinion]})
            }   
        } catch (error) {
           await errorHandle(messageCreate, author, error) 
        }
    }
}