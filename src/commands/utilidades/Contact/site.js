const { MessageEmbed } = require("discord.js")
const pageEmbed = require('discord.js-pagination')
const languages = require("../../../util/languages/languages")

module.exports = {
    aliases: [],
    description: 'Meu site',
    run: async(client, message) => {

        const landingPage = new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
            .setDescription(`Thank you for visiting me ${process.env.CUTIE}`, process.env.CUTIE)
            .setColor("RANDOM")
            .addFields(
                {
                    name: `This is my site:`,
                    value: `[Click Here](https://www.applepiebot.xyz/)`
                }
            )
        const commmandsPage = new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
            .setDescription(`Thank you for visiting me `, process.env.CUTIE)
            .setColor("RANDOM")
            .addFields(
                {
                    name: `These are my commands, take a look on them!:`,
                    value: `[Click Here](https://www.applepiebot.xyz/commands)`
                }
            )
        const invitePage = new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
            .setDescription(`Thank you for visiting me ${process.env.CUTIE}`)
            .setColor("RANDOM")
            .addFields(
                {
                    name: `Here you can find where to invite me:`,
                    value: `[Click Here](https://www.applepiebot.xyz/invite-me)`
                }
            )
        const donatePage = new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
            .setDescription(`Want to create your own bot or donate to Apple?`, process.env.CUTIE)
            .setColor("RANDOM")
            .addFields(
                {
                    name: `Here you can find where to do it!`,
                    value: `[Click Here](https://www.applepiebot.xyz/donate) or [Here!](https://www.fiverr.com/share/2AGlEN) (if you want to buy a bot)`
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