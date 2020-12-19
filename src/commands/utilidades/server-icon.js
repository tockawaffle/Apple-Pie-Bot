const { MessageEmbed } = require("discord.js")
const languages = require("../../util/languages/languages")

module.exports = {
    aliases: ['serveri'],
    description: 'O ícone do servidor',
    run: async(client, message) => {
        const {guild} = message
        const serverIcon = new MessageEmbed()
            .setTitle(`${message.guild.name}`, message.guild.iconURL({dynamic: true}))
            .setDescription(`[${languages(guild, 'SVIC')}](${message.guild.iconURL({format: 'jpg', dynamic:  true, size: 2048})}) ${languages(guild, 'SVIC_C')}`)
            .setImage(message.guild.iconURL({format: 'jpg', dynamic:  true, size: 2048}))
            .setColor('RANDOM')
        message.reply(serverIcon)
    }
}