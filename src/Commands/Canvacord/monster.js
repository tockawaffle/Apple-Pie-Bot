const 
    { MessageEmbed } = require('discord.js'),
    {errorHandle} = require("@configs/other/errorHandle"),
    cvs = require('canvacord'),
    lang = require('@lang')
module.exports = {
    aliases: ['bed'],
    description: 'the monster under your bed Image',
    run: async(client, messageCreate, args) => {

        const {author} = messageCreate

        try {
            const target = messageCreate.mentions.users.first()
            if(!target) {
                const errorEmbed = new MessageEmbed()
                    .setColor("DARK_RED")
                    .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                    .setDescription(`${lang(author, "error")} ${lang(author, "no-args")}\n\n${lang(author, "mention-needed")}`)
                return messageCreate.reply({embeds: [errorEmbed]})
            }
            const 
                bed = await cvs.Canvas.bed(messageCreate.author.avatarURL({format: 'jpg'}), target.avatarURL({format: 'jpg'})),
                attachEmbed = new MessageEmbed()
                    .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                    .setImage("attachment://file.jpg")
                    .setColor("RANDOM")
            messageCreate.reply({embeds: [attachEmbed], files: [bed]})
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }
    }
}