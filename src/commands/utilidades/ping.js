const { MessageEmbed } = require('discord.js');
const pageEmbed = require('discord.js-pagination')
const languages = require('../../util/languages/languages')
module.exports = {
    run: async(client, message, args) => {

        const {guild} = message;
        const pinging = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setDescription(`🏓 Pinging. . .`)
            .setColor('RANDOM')
        message.reply(pinging).then((msg) => {
            msg.delete()
            const pingEmbed = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setDescription(`This is my ping:`)
                .addFields(
                    {
                        name: `Bot Ping`,
                        value: `\`\`\`${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\`\`\``
                    },
                    {
                        name: `API Ping`,
                        value: `\`\`\`${Math.round(client.ws.ping)}ms\`\`\``
                    }
                )
                .setColor("RANDOM")
            const hostEmbed = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic:true}))
                .setDescription(`The bot's host is named FantasyHost!`)
                .addFields(
                    {
                        name: `Give it a check (the site is in pt-br, but you can buy using US$)`,
                        value: `[Click Here](https://fantasyhosting.com.br/)`
                    }
                )
                .setColor("RANDOM")
            pages = [
                pingEmbed,
                hostEmbed
            ]

            pageEmbed(message, pages)
        })
        
        
    },
    aliases: ["ping"],
    description: "Latência e ping da API"
}
