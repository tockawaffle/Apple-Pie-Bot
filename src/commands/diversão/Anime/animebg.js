const { MessageEmbed } = require("discord.js")
const languages = require("../../../util/languages/languages")

module.exports = {
    aliases: [],
    description: 'SFW Wallpapers',
    run: async(client, message, args) => {
        const pageEmbed = require('discord.js-pagination')
        const akaneko = require('akaneko')

        if(!args[0]) {
            const errorEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setDescription(`${languages(guild, "NARGS")}`)
                .addFields(
                    {
                        name: `${languages(guild, "NARGS_2")}`,
                        value: `${languages(guild, "NARGS_3")}.`
                    }
                )
                .setColor("RED")
            const secondEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setDescription(`${languages(guild, "BGNSFW")}`)
                .addFields(
                    {
                        name: `PC:`,
                        value: "```_animebg pc```"
                    },
                    {
                        name: `Mobile:`,
                        value: "```_animebg mobile```"
                    }
                )
                .setColor("RED")
            pages = [errorEmbed, secondEmbed]
            pageEmbed(message, pages)
            return
        }
        try{
            if(args[0] === 'pc') {
                const pcEmbed = new MessageEmbed()
                    .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                    .setImage(await akaneko.wallpapers())
                    .setDescription(`${languages(guild, "BGNSFW2")}`)
                    .setColor("RANDOM")
                message.reply(pcEmbed)
            } else if(args[0] === 'mobile') {
                const mobileEmbed = new MessageEmbed()
                    .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                    .setImage(await akaneko.mobileWallpapers())
                    .setDescription(`${languages(guild, "BGNSFW2")}`)
                    .setColor('RANDOM')
                message.reply(mobileEmbed)
            }
        }catch(err) {
            const errEmbed = new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
            .setColor('RANDOM')
            .setDescription(`${languages(guild, "mst5")}`)
            const errDet = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setColor('RANDOM')
                .setDescription(`${languages(guild, "mst6")}`)
                .addFields(
                    {
                        name: `${languages(guild, mst6)}`,
                        value: `\`\`\`${err}\`\`\``
                    }
                )
            pages = [
                errEmbed,
                errDet
            ]
            pageEmbed(message, pages)
        }
    }
}