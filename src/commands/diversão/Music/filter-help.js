const { MessageEmbed } = require("discord.js")
const languages = require('../../../util/languages/languages')
const pageEmbed = require('discord.js-pagination')
const filter = require("./filter")
module.exports = {
    aliases: ['fh'],
    description: 'Ajuda para os filtros',
    run: async(client, message, args) => {

        const {guild} = message
        const filterHelp = new MessageEmbed()
            .setAuthor(`${message.guild.name}`, message.guild.iconURL({dynamic: true}))
            .setDescription(`${languages(guild, "FH")}`)
            .addFields(
                {
                    name: `${languages(guild, "FH_2")}`,
                    value: `${languages(guild, "FH_4")}`
                }
            )
            .setFooter(`${languages(guild, "FH_3")}`)
            .setColor('RANDOM')
        const filters = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setDescription(`${languages(guild, "FH")}\n${languages(guild, "FH_5")} [${languages(guild, "FH_6")}](https://www.applepiebot.xyz/music-filters)`)
            .addFields(
                {
                    name: `Bassboost`,
                    value: `\`\`\`_filter bassboost\`\`\``,
                    inline: true
                },
                {
                    name: `8D`,
                    value: `\`\`\`_filter 8d\`\`\``,
                    inline: true
                },
                {
                    name: `Vaporwave`,
                    value: `\`\`\`_filter vaporwave\`\`\``,
                    inline: true
                },
                {
                    name: `Nightcore`,
                    value: `\`\`\`_filter nighcore\`\`\``,
                    inline: true
                },
                {
                    name: `Phaser`,
                    value: `\`\`\`_filter phaser\`\`\``,
                    inline: true
                },
                {
                    name: `Tremolo`,
                    value: `\`\`\`_filter tremolo\`\`\``,
                    inline: true
                },
                {
                    name: `Vibrato`,
                    value: `\`\`\`_filter vibrato\`\`\``,
                    inline: true
                },
                {
                    name: `Reverse`,
                    value: `\`\`\`_filter reverse\`\`\``,
                    inline: true
                },
                {
                    name: `Treble`,
                    value: `\`\`\`_filter treble\`\`\``,
                    inline: true
                },
                {
                    name: `Normalizer`,
                    value: `\`\`\`_filter normalizer\`\`\``,
                    inline: true
                },
                {
                    name: `Surrounding`,
                    value: `\`\`\`_filter surrounding\`\`\``,
                    inline: true
                },
                {
                    name: `Pulsator`,
                    value: `\`\`\`_filter pulsator\`\`\``,
                    inline: true
                },
                {
                    name: `SubBoost`,
                    value: `\`\`\`_filter subboost\`\`\``,
                    inline: true
                },
                {
                    name: `Karaoke`,
                    value: `\`\`\`_filter karaoke\`\`\``,
                    inline: true
                },
                {
                    name: `Flanger`,
                    value: `\`\`\`_filter flanger\`\`\``,
                    inline: true
                },
                {
                    name: `Gate`,
                    value: `\`\`\`_filter gate\`\`\``,
                    inline: true
                },
                {
                    name: `Haas`,
                    value: `\`\`\`_filter Haas\`\`\``,
                    inline: true
                },
                {
                    name: `Mcompand`,
                    value: `\`\`\`_filter mcompand\`\`\``,
                    inline: true
                }
            )
        pages = [
            filterHelp,
            filters
        ]
        pageEmbed(message, pages)
    }
}