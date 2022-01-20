const 
    cvs = require('canvacord'),
    { MessageEmbed } = require('discord.js'),
    {errorHandle} = require("@configs/other/errorHandle");
module.exports = {
    aliases: [],
    description: 'Jail Image',
    run: async(client, messageCreate, args) => {

        try {
            const 
                { author } = messageCreate,
                target = messageCreate.mentions.users.first() || messageCreate.author,
                avatar = target.avatarURL({format: 'jpg'});
            let greyscale = args[1]
            if(!messageCreate.mentions.users.first()) { greyscale = args[0] }
            if(args[1] === 'yes') { greyscale = true } 
            else if(args[1] === 'no') { greyscale = false }
            else if(!greyscale) { 
                greyscale = false }

            const
                facepalm = await cvs.Canvas.jail(avatar, greyscale),
                attachEmbed = new MessageEmbed()
                    .setAuthor({name: author.username, url: author.displayAvatarURL({dynamic: true})})
                    .setImage("attachment://file.jpg")
                    .setColor("RANDOM")
            await messageCreate.reply({embeds: [attachEmbed], files: [facepalm]})
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }
    }
}