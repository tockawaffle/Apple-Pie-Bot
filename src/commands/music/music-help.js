const { MessageEmbed } = require("discord.js")

const languages = require('../../util/languages/languages')
module.exports = {
    aliases: ['mh'],
    description: "Music Help Command",
    run: async(client, message, args) => {
        const {guild} = message
        const helpEmbed = new MessageEmbed()
            .setAuthor(`${message.guild.name}`, message.guild.iconURL({dynamic: true}))
            .setDescription(`${languages(guild, 'MH')}`)
            .setColor('RANDOM')
            .setFooter(``)
            .setTimestamp()
            .addFields(
                {
                    name: `${languages(guild, 'MH_3')}`,
                    value: `-loop`,
                    inline: true
                },
                { 
                    name: `${languages(guild, 'MH_4')}`,
                    value: `-np`,
                    inline: true
                },
                {
                    name: `${languages(guild, 'MH_5')}`,
                    value: `-play <link only>`,
                    inline: true
                },
                {
                    name: `${languages(guild, 'MH_6')}`,
                    value: `-queue`,
                    inline: true
                },
                {
                    name: `${languages(guild, 'MH_7')}`,
                    value: `-skip`,
                    inline: true
                },
                {
                    name: `${languages(guild, 'MH_8')}`,
                    value: `-stop`,
                    inline: true
                },
                {
                    name: `${languages(guild, 'MH_2')}`,
                    value: '[Discord-Player](https://www.npmjs.com/package/discord-player)'
                }
            )
        message.reply(helpEmbed)
            
    }
}