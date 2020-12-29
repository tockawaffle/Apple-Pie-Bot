const { MessageEmbed } = require("discord.js")
const pageEmbed = require('discord.js-pagination')
const languages = require("../../../util/languages/languages")

module.exports = {
    aliases: [],
    description: 'Meu site',
    run: async(client, message) => {

        const {guild} = message

        const landingPage = new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
            .setDescription(`${languages(guild, "ST")}` + process.env.CUTIE)
            .setColor("RANDOM")
            .addFields(
                {
                    name: `${languages(guild, "ST2")}`,
                    value: `[${languages(guild, "H_C21")}](https://www.applepiebot.xyz/)`
                }
            )
        const commmandsPage = new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
            .setDescription(`${languages(guild, "ST")}` + process.env.CUTIE)
            .setColor("RANDOM")
            .addFields(
                {
                    name: `${languages(guild, "ST3")}`,
                    value: `[${languages(guild, "H_C21")}](https://www.applepiebot.xyz/commands)`
                }
            )
        const invitePage = new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
            .setDescription(`${languages(guild, "ST")}${process.env.CUTIE}`)
            .setColor("RANDOM")
            .addFields(
                {
                    name: `${languages(guild, "ST4")}`,
                    value: `[${languages(guild, "H_C21")}](https://www.applepiebot.xyz/invite-me)`
                }
            )
        const donatePage = new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
            .setDescription(`${languages(guild, "ST5")}` + process.env.CUTIE)
            .setColor("RANDOM")
            .addFields(
                {
                    name: `${languages(guild, "ST6")}`,
                    value: `[${languages(guild, "H_C21")}](https://www.applepiebot.xyz/donate)`
                }
            )
        pages = [
            landingPage,
            commmandsPage,
            invitePage,
            donatePage
        ]
        pageEmbed(message, pages)
    }
}