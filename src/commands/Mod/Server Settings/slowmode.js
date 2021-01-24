const { MessageEmbed} = require("discord.js");
const languages = require('../../../util/languages/languages')
const pageEmbed = require('discord.js-pagination')

module.exports = {
    run: async(client, message, args) => {

        const chn = message.mentions.channels.first() || message.channel
        const {guild} = message

        let time = args[0]
        if(!time) {
            const noUserPerm = new MessageEmbed()
            .setDescription(`${languages(guild, "SM_C")}`)
            .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
            .addFields(
                {name: `${languages(guild, "SM_C2")}`,value: `${languages(guild, "SM_C3")}`},
                {name: `${languages(guild, "SM_C4")}`,value: `\`\`\`_slowmode <numberInSeconds> <#channelMention>\`\`\``}
            )
            .setColor('RED')
        message.reply(noUserPerm)
        return
        }

        if(time > 21600) {
            const tooHigh = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setDescription(`${languages(guild, "SM_C5")}`)
                .addFields(
                    {name: `${languages(guild, "SM_C6")}`,value: `${languages(guild, "SM_C7")}`}
                )
                .setColor('RANDOM')
            const seconds = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setDescription(`${languages(guild, "SM_C8")}`)
                .addFields(
                    {name: `Seconds`,value: `\`\`\`1 to 60 seconds\`\`\``}
                )
                .setColor('RANDOM')
            const minutes = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setDescription(`${languages(guild, "SM_C9")}`)
                .addFields(
                    {name: `1 Minute:`,value: `\`\`\`60 seconds\`\`\``},
                    {name: `2 Minutes`,value: `\`\`\`120 seconds\`\`\``},
                    {name: `5 Minutes:`,value: `\`\`\`300 seconds\`\`\``},
                    {name: `10 Minutes:`,value: `\`\`\`600 seconds\`\`\``},
                    {name: `15 Minutes:`,value: `\`\`\`900 seconds\`\`\``},
                    {name: `30 Minutes:`,value: `\`\`\`18000 seconds\`\`\``}
                )
                .setColor('RANDOM')
            const hours = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setDescription(`${languages(guild, "SM_C10")}`)
                .addFields(
                    {name: `1 Hour:`,value: `\`\`\`3600 seconds\`\`\``},
                    {name: `2 Hours:`,value: `\`\`\`7200 seconds\`\`\``},
                    {name: `6 Hours:`,value: `\`\`\`21600 seconds\`\`\``}
                )
                .setColor('RANDOM')
            pages = [tooHigh,seconds,minutes,hours]
            pageEmbed(message, pages)
            return
        }
        if(isNaN(time)) {
            const tooHigh = new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
            .setDescription(`${languages(guild, "SM_C11")}`)
            .addFields(
                {name: `${languages(guild, "SM_C6")}`,value: `${languages(guild, "SM_C7")}`},
                {name: `${languages(guild, "SM_C12")}`,value: `\`\`\`_slowmode <numberInSeconds>\`\`\``}
            )
            .setColor('RANDOM')
            const seconds = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setDescription(`${languages(guild, "SM_C8")}`)
                .addFields(
                    {name: `Seconds:`, value: `\`\`\`1 to 60 seconds\`\`\``}
                )
                .setColor('RANDOM')
            const minutes = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setDescription(`${languages(guild, "SM_C9")}`)
                .addFields(
                    {name: `1 Minute:`,value: `\`\`\`60 seconds\`\`\``},
                    {name: `2 Minutes`,value: `\`\`\`120 seconds\`\`\``},
                    {name: `5 Minutes:`,value: `\`\`\`300 seconds\`\`\``},
                    {name: `10 Minutes:`,value: `\`\`\`600 seconds\`\`\``},
                    {name: `15 Minutes:`,value: `\`\`\`900 seconds\`\`\``},
                    {name: `30 Minutes:`,value: `\`\`\`18000 seconds\`\`\``}
                )
                .setColor('RANDOM')
            const hours = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setDescription(`${languages(guild, "SM_C10")}`)
                .addFields(
                    {name: `1 Hour:`,value: `\`\`\`3600 seconds\`\`\``},
                    {name: `2 Hours:`,value: `\`\`\`7200 seconds\`\`\``},
                    {name: `6 Hours:`,value: `\`\`\`21600 seconds\`\`\``}
                )
                .setColor('RANDOM')
            pages = [tooHigh, seconds,minutes,hours]
            pageEmbed(message, pages)
            return
        }
        if(!message.member.hasPermission("MANAGE_CHANNELS")) {
            const noUserPerm = new MessageEmbed()
                .setDescription(`${languages(guild, "L_C")}`)
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .addFields(
                    {name: `${languages(guild, "L_C2")}`,value: `${languages(guild, "L_C8")}`}
                )
                .setColor('RED')
            message.reply(noUserPerm)
            return
        }
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
            const noClientPerm = new MessageEmbed()
                .setDescription(`${languages(guild, "L_C3")}`)
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .addFields(
                    {name: `${languages(guild, "L_C4")}`,value: `[${languages(H_C21)}](https://www.applepiebot.xyz/permission-flags)`},
                    {name: `${languages(guild, "L_C6")}`,value: `\`\`\`${languages(guild, "L_C7")}\`\`\``}
                )
                .setFooter(`${languages(guild, "L_C5")}`)
                .setColor('RED')
            message.reply(noClientPerm)
            return
        }


        const sucess = new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
            .setDescription(`✅ Sucess!: Slowmode`)
            .addFields(
                {name: `Slowmode set to:`,value: `\`\`\`${time} seconds\`\`\``},
                {name: `Channel the slowmode was set:`,value: `\`\`\`${chn.name}\`\`\``},
                {name: `To remove the slowmode, type:`,value: `\`\`\`_slowmode 0\`\`\``}

            )
        message.reply(sucess).then((msg) => {
            chn.setRateLimitPerUser(time).catch(err => {
                msg.delete()
                const embedError = new MessageEmbed()
                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                    .setDescription(`${languages(guild, "M_E")}`)
                    .addFields(
                        {name: `${languages(guild, "M_E2")}`,value: `\`\`\`${err}\`\`\``},
                        {name: `${languages(guild, "M_E3")}`,value: `${languages(guild, "M_E4")}`}
                    )
                const solution = new MessageEmbed()
                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                    .setDescription(`${languages(guild, "M_E5")}`)
                    .addFields(
                        {name: `${languages(guild, "M_E6")}`,value: `[Click Here](https://www.applepiebot.xyz/permission-flags)`},
                        {name: `${languages(guild, "SM_C17")}`,value: `${languages(guild, "SM_C18")}`}
                    )
                pages = [embedError, solution]
                pageEmbed(message,pages)
            })
        })

        

    },
    aliases: ['sm', 'slow', 'smd'],
    description: 'Slowmode'
}