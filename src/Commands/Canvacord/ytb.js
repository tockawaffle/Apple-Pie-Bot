const cvs = require('canvacord')
const { MessageEmbed } = require('discord.js')
const lang = require('@lang');

module.exports = {
    aliases: [],
    description: 'Pornhub Comment',
    run: async(client, messageCreate) => {
        
        const { author } = messageCreate
        const args = messageCreate.content.split(' ');
        args.shift()
        if(!args[0]) return messageCreate.channel.send(`${lang(author, 'CV_C2')}`)
        else {
            const target = messageCreate.mentions.users.first()
            if(target) {
                args.shift()
                const ytb = await cvs.Canvas.youtube({username: target.username, content: args.join(' '), avatar: target.avatarURL({format: 'jpg'})})
                const attachEmbed = new MessageEmbed()
                    .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                    .setImage("attachment://file.jpg")
                    .setColor("RANDOM")
                messageCreate.reply({embeds: [attachEmbed], files: [ytb]})
            } else{
                const ytb = await cvs.Canvas.youtube({username: messageCreate.author.username, content: args.join(' '), avatar: messageCreate.author.avatarURL({format: 'jpg'})})
                const attachEmbed = new MessageEmbed()
                    .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                    .setImage("attachment://file.jpg")
                    .setColor("RANDOM")
                messageCreate.reply({embeds: [attachEmbed], files: [ytb]})
            }

        }
    }
}