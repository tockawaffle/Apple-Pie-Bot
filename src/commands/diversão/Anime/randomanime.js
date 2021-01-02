const { MessageEmbed } = require('discord.js')
const akaneko = require('akaneko')
const languages = require('../../../util/languages/languages')
module.exports = {
    aliases: ['rda'],
    description: 'Um gerador de garotas de anime com borgars',
    run: async(client, message, args) => {


        if(!args[0]) {
            const errorEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setDescription(`${languages(guild, "NARGS")}`)
                .addFields(
                    {
                        name: `${languages(guild, "NARGS2")}`,
                        value: `${languages(guild, "NARGS3")}.`
                    }
                )
                .setColor("RED")
            message.reply(errorEmbed)
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