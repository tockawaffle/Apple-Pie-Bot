const { MessageEmbed } = require("discord.js")

module.exports = {
    aliases: ['bgnsfw'],
    description: 'NSFW Wallpapers',
    run: async(client, message, args) => {
        const pageEmbed = require('discord.js-pagination')
        const akaneko = require('akaneko')
        if(!message.channel.nsfw) return message.reply('Not a nsfw channel uwu').then((msg) => {msg.delete({timeout: 5000})})

        if(!args[0]) {
            const errorEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setDescription(`❌ Failed: Missing Args`)
                .addFields(
                    {
                        name: `You didn't request something to be sent`,
                        value: `Please, check the next page.`
                    }
                )
                .setColor("RED")
            const secondEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setDescription(`These are the current wallpapers you can request:`)
                .addFields(
                    {
                        name: `For PC:`,
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
                .setDescription(`Here's your wallpaper!`)
                .setColor("RANDOM")
            message.reply(pcEmbed)
        } else if(args[0] === 'mobile') {
            const mobileEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setImage(await akaneko.nsfw.mobileWallpapers())
                .setDescription(`Here's your mobile wallpaper!`)
                .setColor('RANDOM')
            message.reply(mobileEmbed)
        }
    }
}