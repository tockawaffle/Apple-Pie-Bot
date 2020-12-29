const { MessageEmbed } = require("discord.js")
const languages = require('../../../util/languages/languages')

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
                    value: `\`\`\`_loop\`\`\``,
                },
                { 
                    name: `${languages(guild, 'MH_4')}`,
                    value: `\`\`\`_np\`\`\``,
                },
                {
                    name: `${languages(guild, 'MH_5')}`,
                    value: `\`\`\`_play <link only>\`\`\``,
                },
                {
                    name: `${languages(guild, 'MH_6')}`,
                    value: `\`\`\`_queue\`\`\``,
                },
                {
                    name: `${languages(guild, 'MH_7')}`,
                    value: `\`\`\`_skip\`\`\``,
                },
                {
                    name: `${languages(guild, 'MH_8')}`,
                    value: `\`\`\`_stop\`\`\``,
                },
                {
                    name: `Filters:`,
                    value: `\`\`\`_filters-help\`\`\``,
                },
                {
                    name: `${MH_9}`,
                    value: '```_shuffle```'
                }
            )
        message.reply(helpEmbed)
            
    }
}