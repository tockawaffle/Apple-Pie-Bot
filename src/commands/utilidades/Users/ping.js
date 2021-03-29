const { MessageEmbed } = require('discord.js');
const pageEmbed = require('discord.js-pagination')
const languages = require('../../../util/languages/languages')
const ms = require('ms')

module.exports = {
    run: async(client, message, args) => {

        const {guild} = message;
        const uptimeFormat = ms(client.uptime, {long: true})
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
                    {name: `${languages(guild, "P9")}`,value: `\`\`\`${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\`\`\``},
                    {name: `API Ping`,value: `\`\`\`${Math.round(client.ws.ping)}ms\`\`\``},
                    {name: 'Uptime', value: `\`\`\`I've been online for: ${uptimeFormat}!\`\`\``}
                )
                .setColor("RANDOM")
            const hostEmbed = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic:true}))
                .setDescription(`${languages(guild, "P_C")}`)
                .addFields(
                    {name: `${languages(guild, "P2_C")}`,value: `[${languages(guild, "VT_C2")}](https://fantasyhosting.com.br/)\n${languages(guild, "P3_C")}`}
                )
                .setColor("RANDOM")
            const pingFaQ= new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic:true}))
                .setColor("RANDOM")
                .setDescription(`${languages(guild, "P4")}`)
                .addFields(
                    {name: `${languages(guild, "P5")}`,value: `\`\`\`${languages(guild, "P6")}\n${languages(guild, "P7")}\n${languages(guild, "P8")}\`\`\``}
                )
            pages = [
                pingEmbed,
                pingFaQ,
                hostEmbed
            ]
            setTimeout(function() {
                pageEmbed(message, pages)
            }, 20)
        })
        
        
    },
    aliases: ["ping"],
    description: "Latência e ping da API"
}
