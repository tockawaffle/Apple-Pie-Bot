const { MessageEmbed } = require('discord.js')

module.exports = {
    aliases: ['rda'],
    description: 'Um gerador de garotas de anime com borgars',
    run: async(client, message, args) => {
        const akaneko = require('akaneko')

        if(!args[0]) {
            const errorEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setDescription(`❌ Failed: Missing Argument`)
                .addFields(
                    {
                        name: `You need to choose between:`,
                        value: '```foxgirl or neko```'
                    },
                    {
                        name: `Example:`,
                        value: '```_rda foxgirl\n_rda neko```'
                    }
                )
            message.reply(errorEmbed)
            return
        }

        if(args[0] === 'foxgirl') {
            const foxgirlEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setImage(await akaneko.foxgirl())
                .setColor('RANDOM')
                .setFooter(`Yes! That is a fox\nFubuki would be ashemed if you think that's a catgirl!`)
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