const { MessageEmbed } = require('discord.js')
const newPrefixSchema = require('../../../configs/db/schemas/prefix-schema')
const languages = require('../../../util/languages/languages')

module.exports = {
    aliases: ['setp', 'chgpfx'],
    description: 'Muda o Prefixo',
    run: async(client, message, args) => {

        const {guild} = message

        if(!message.member.hasPermission('MANAGE_GUILD')) {
            const noPerm = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setFooter(client.user.username, client.user.avatarURL())
                .setDescription(languages(guild, "NPFX"))
                .addFields(
                    {
                        name: languages(guild, "NPFX2"),
                        value: languages(guild, "NPFX3")
                    }
                )
            message.reply(noPerm)
            return
        }
        const settings = await newPrefixSchema.findOne({_id: guild.id,})
        if(args < 1) {
            const noArgs = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setFooter(client.user.username, client.user.avatarURL())
                .setDescription(languages(guild, "APFX"))
                .addFields(
                    {
                        name: languages(guild, "APFX2"),
                        value: `${languages(guild, "APFX3")} \`${settings.prefix}setprefix <${languages(guild, "APFX4")}>\``
                    }
                )
            message.reply(noArgs)
            return
        }
        
        await settings.updateOne({prefix: args[0]})
        const sucessEmbed = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setDescription(`${languages(guild, "PFX")}`)
            .addFields(
                {
                    name: `${languages(guild, "PFX2")}`,
                    value: `\`${args[0]}\``
                }
            )
            .setColor("RANDOM")
            .setFooter(client.user.username, client.user.avatarURL())
        message.reply(sucessEmbed)

    }
}