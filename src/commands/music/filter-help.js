const { MessageEmbed } = require("discord.js")
const languages = require('../../util/languages/languages')
module.exports = {
    aliases: [],
    description: 'Ajuda para os filtros',
    run: async(client, message, args) => {
        const {guild} = message
        const filterHelp = new MessageEmbed()
            .setAuthor(`${message.guild.name}`, message.guild.iconURL({dynamic: true}))
            .setDescription(`${languages(guild, "FH")}`)
            .addFields(
                {
                    name: `${languages(guild, "FH_2")}`,
                    value: `bassboost\n8D\nvaporwave\nnightcore\nphaser\ntremolo\nvibrato\nreverse\ntreble\nnormalizer\nsurrounding\npulsator\nsubboost\nkaraoke\nflanger\ngate\nhaas\nmcompand`
                }
            )
            .setFooter(`${languages(guild, "FH_3")}`)
            .setColor('RANDOM')
        message.reply(filterHelp)
    }
}