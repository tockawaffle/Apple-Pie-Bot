const cvs = require('canvacord')
const { MessageAttachment, MessageEmbed } = require('discord.js')
const languages = require('../../../util/languages/languages')
module.exports = {
    aliases: ['bed'],
    description: 'the monster under your bed Image',
    run: async(client, message, args) => {

        const {guild} = message

        const target = message.mentions.users.first()
        if(!target) {
            const errorEmbed = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setDescription(`${languages(guild, "mst")}`)
                .addField(`${languages(guild, "mst2")}`, `${languages(guild, "mst3")}`)
            message.reply(errorEmbed)
            return
        }
        const bed = await cvs.Canvas.bed(message.author.avatarURL({format: 'jpg'}), target.avatarURL({format: 'jpg'}))
        let attachment = new MessageAttachment(bed, "monster_below_you.jpeg")
        message.channel.send(attachment)

    }
}