const 
    cvs = require('canvacord'),
    { MessageEmbed } = require('discord.js'),
    {errorHandle} = require("@configs/other/errorHandle");
module.exports = {
    aliases: [],
    description: 'facepalm Image',
    run: async(client, messageCreate, args) => {

        try {
            const 
                { author } = messageCreate,
                target = messageCreate.mentions.users.first() || messageCreate.author,
                facepalm = await cvs.Canvas.facepalm(target.avatarURL({format: 'jpg'})),
                attachEmbed = new MessageEmbed()
                .setAuthor({name: author.username, iconURL: author.displayAvatarURL({dynamic: true})})
                .setImage("attachment://file.jpg")
                .setColor("RANDOM")
            await messageCreate.reply({embeds: [attachEmbed], files: [facepalm]})            
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }
    }
}