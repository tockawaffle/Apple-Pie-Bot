const { MessageEmbed } = require("discord.js")
const languages = require("../../../util/languages/languages")
const pageEmbed = require('discord.js-pagination')
const akaneko = require('akaneko')

module.exports = {
    aliases: ['bgnsfw'],
    description: 'NSFW Wallpapers',
    run: async(client, message, args) => {

        const {guild} = message

        if(!message.channel.nsfw) return message.reply(`${languages(guild, "NOTNSFW")}`).then((msg) => {msg.delete({timeout: 5000})})

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
                        value: "```_bgnsfw pc```"
                    },
                    {
                        name: `Mobile:`,
                        value: "```_bgnsfw mobile```"
                    }
                )
                .setColor("RED")
            pages = [errorEmbed, secondEmbed]
            pageEmbed(message, pages)
            return
        }
        if(args[0] === 'pc') {
            const pcEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setImage(await akaneko.nsfw.wallpapers())
                .setDescription(`${languages(guild, "BGNSFW2")}`)
                .setColor("RANDOM")
            message.reply(pcEmbed)
        } else if(args[0] === 'mobile') {
            const mobileEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setImage(await akaneko.nsfw.mobileWallpapers())
                .setDescription(`${languages(guild, "BGNSFW2")}`)
                .setColor('RANDOM')
            message.reply(mobileEmbed)
        }
    }
}