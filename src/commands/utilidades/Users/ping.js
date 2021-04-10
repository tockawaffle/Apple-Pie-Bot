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
        message.reply(pinging).then(async(msg) => {
            let msgEdit = msg.edit(pinging)
            await msgEdit; let msgDel = msg.delete()
            const pingEmbed = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setDescription(`This is my ping:`)
                .addFields(
                    {name: `${languages(guild, "P9")}`,value: `\`\`\`${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\`\`\``},
                    {name: `API Ping`,value: `\`\`\`${Math.round(client.ws.ping)}ms\`\`\``},
                    {name: 'Uptime', value: `\`\`\`I've been online for: ${uptimeFormat}!\`\`\``}
                )
                .setColor("RANDOM")
            await msgDel; message.reply(pingEmbed)
        })
        
        
    },
    aliases: ["ping"],
    description: "Latência e ping da API"
}
