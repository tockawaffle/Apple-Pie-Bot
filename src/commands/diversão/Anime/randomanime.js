const { MessageEmbed } = require('discord.js')
const akaneko = require('akaneko')
const languages = require('../../../util/languages/languages')
const pageEmbed = require('discord.js-pagination')

module.exports = {
    aliases: ['rda'],
    description: 'Um gerador de garotas de anime com borgars',
    run: async(client, message, args) => {

        const {guild} = message

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
            const pages = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setDescription(`${languages(guild, "AN")}`)
                .addFields(
                    {
                        name: `${languages(guild, "AN1")}`,
                        value: '```_rda foxgirl```'
                    },
                    {
                        name: `${languages(guild, "AN2")}`,
                        value: '```_rda neko```'
                    }
                )
                .setColor("RED")
            page = [errorEmbed, pages]
            pageEmbed(message, page)
            return
        }

        if(args[0] === 'foxgirl') {
            const foxgirlEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setImage(await akaneko.foxgirl())
                .setColor('RANDOM')
                .setFooter(`${languages(guild, "RDA")}`)
            message.reply(foxgirlEmbed)
        } else if (args[0] === 'neko') {
            const nekoEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setImage(await akaneko.neko())
                .setColor('RANDOM')
                .setFooter(`Nyan, senpai~`)
            message.reply(nekoEmbed)
        }
    }
}