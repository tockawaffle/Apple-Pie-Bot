const { MessageEmbed } = require("discord.js")
const moment = require('moment')
const languages = require('../../../util/languages/languages')

module.exports = {
    run: async(client, message) => {
        const { guild } = message
        const created = moment(guild.createdAt).locale('pt-br').format('ll')

        try{
            const embed = new MessageEmbed()
                .setTitle(`Server info!`)
                .setAuthor(`${guild.name}`, guild.iconURL({dynamic: true}))
                .addFields(
                    {
                        name: `${languages(guild, 'SI_C')}`,
                        value: `\`\`\`${guild.owner.user.tag}\`\`\``
                    },
                    {
                        name: `${languages(guild, 'SI_C2')}`,
                        value: `\`\`\`${guild.members.cache.filter(member => !member.user.bot).size} ${languages(guild, 'SI_MB')}\`\`\``
                    },
                    {
                        name: `${languages(guild, 'SI_C8')}`,
                        value: `\`\`\`${guild.members.cache.filter(member => member.user.bot).size} bots\`\`\``,
                    },
                    {
                        name: `${languages(guild, 'SI_C3')}`,
                        value: `\`\`\`${guild.members.cache.filter(member => member.presence.status !== "offline").size} ${languages(guild, 'SI_ST')}\n${guild.members.cache.filter(member => member.presence.status == "idle").size} ${languages(guild, 'SI_ST2')}\n${guild.members.cache.filter(member => member.presence.status == "dnd").size} ${languages(guild, 'SI_ST3')}\n${guild.members.cache.filter(member => member.presence.status == "offline").size} ${languages(guild, 'SI_ST4')}\`\`\``,
                    },
                    {
                        name: `${languages(guild, 'SI_C4')}`,
                        value: `\`\`\`${guild.roles.cache.size} ${languages(guild, 'SI_RC')}\`\`\``,
                    },
                    {
                        name: `${languages(guild, 'SI_C5')}`,
                        value: `\`\`\`${guild.channels.cache.filter(channel => channel.type == "text").size} ${languages(guild, 'SI_CC')}\n${guild.channels.cache.filter(channel => channel.type == "voice").size} ${languages(guild, 'SI_CC2')}\`\`\``,
                    },
                    {
                        name: `${languages(guild, 'SI_C6')}`,
                        value: `\`\`\`${created}\`\`\``,
                    },
                    {
                        name: `${languages(guild, 'SI_C7')}`,
                        value: `\`\`\`${guild.emojis.cache.size} ${languages(guild, 'SI_EM')}\`\`\``,

                    }
                )
                .setTimestamp()
                .setColor('RANDOM')
            message.channel.send(embed)
        }catch(err) {
            console.log(err)
        }
    }, aliases: ['si'], description: 'Server info'
}