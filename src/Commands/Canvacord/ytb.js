const 
    { MessageEmbed } = require('discord.js'),
    {errorHandle} = require("@configs/other/errorHandle"),
    cvs = require('canvacord'),
    lang = require('@lang');

module.exports = {
    aliases: [],
    description: 'Pornhub Comment',
    run: async(client, messageCreate) => {
        const { author } = messageCreate
        try {
            const args = messageCreate.content.split(' ');
            args.shift()
            if(!args[0]) return messageCreate.channel.send(`${lang(author, 'CV_C2')}`)
            else {
                const target = messageCreate.mentions.users.first()
                if(target) {
                    args.shift()
                    const 
                        ytb = await cvs.Canvas.youtube({username: target.username, content: args.join(' '), avatar: target.avatarURL({format: 'jpg'})}),
                        attachEmbed = new MessageEmbed()
                            .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                            .setImage("attachment://file.jpg")
                            .setColor("RANDOM")
                    await messageCreate.reply({embeds: [attachEmbed], files: [ytb]})
                } else{
                    const 
                        ytb = await cvs.Canvas.youtube({username: messageCreate.author.username, content: args.join(' '), avatar: messageCreate.author.avatarURL({format: 'jpg'})}),
                        attachEmbed = new MessageEmbed()
                            .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                            .setImage("attachment://file.jpg")
                            .setColor("RANDOM")
                    await messageCreate.reply({embeds: [attachEmbed], files: [ytb]})
                }
            }
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }
        
    }
}