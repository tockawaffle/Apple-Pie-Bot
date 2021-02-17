const {MessageEmbed} = require('discord.js')
const moment = require('moment')
const languages = require('../../../util/languages/languages')

module.exports = {
    run: async(client, message,args) => {

        const {guild, author} = message
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const gUser = client.users.cache.get(args[0])

        if(gUser && !member) {
            const created = moment(gUser.createdAt).locale('pt-br').format('L')
            let presence = gUser.presence.status
            if(presence === 'dnd') {
                presence = `\`\`\`${languages(guild, 'uf')}\`\`\``
            } else if (presence === 'idle') {
                presence = `\`\`\`${languages(guild, 'uf1')}\`\`\``
            } else if (presence === 'online') {
                presence = '```Online```'
            } else if (presence === 'offline') {
                presence = '```Offline```'
            }
            const memberEmbed = new MessageEmbed()
                .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                .setDescription(`🔍🌎${author.username} ${languages(guild, "uf2")} ${gUser.username}!`)
                .setThumbnail(gUser.avatarURL({dynamic: true}))
                .setColor("RANDOM")
                .addFields(
                    {name: `${languages(guild, "uf3")}`, value: `\`\`\`${gUser.username}\`\`\``},
                    {name: `${languages(guild, "uf4")}`,value: `\`\`\`${gUser.id}\`\`\``},
                    {name: `${languages(guild, "uf5")}`,value: `${presence}`},
                    {name: `${languages(guild, "uf6")}`,value: `\`\`\`${created}\`\`\``},
                    {name: `${languages(guild, "uf7")}`, value: `\`\`\`${gUser.presence.activities}.\`\`\``,}
                )
            message.reply(memberEmbed)
            return
        }
        if(member) {
            let presence = member.user.presence.status
            let richPresence = member.user.presence.activities
            if(presence === 'dnd') {
                presence = `\`\`\`${languages(guild, 'uf')}\`\`\``
            } else if (presence === 'idle') {
                presence = `\`\`\`${languages(guild, 'uf1')}\`\`\``
            } else if (presence === 'online') {
                presence = '```Online```'
            } else if (presence === 'offline') {
                presence = '```Offline```'
            }
            const joined = moment(member.joinedAt).locale('pt-br').format('L')
            const created = moment(member.user.createdAt).locale('pt-br').format('L')
            const memberEmbed = new MessageEmbed()
                .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                .setDescription(`🔍${author.username} ${languages(guild, "uf2")} ${member.user.username}!`)
                .setThumbnail(member.user.avatarURL({dynamic: true}))
                .setColor("RANDOM")
                .addFields(
                    {name: `${languages(guild, "uf3")}`,value: `\`\`\`${member.user.username}\`\`\``},
                    {name: `${languages(guild, "uf4")}`,value: `\`\`\`${member.user.id}\`\`\``},
                    {name: `${languages(guild, "uf5")}`,value: `${presence}`},
                    {name: `${languages(guild, "uf7")}`,value: `\`\`\`${richPresence}.\`\`\``},
                    {name: `${languages(guild, "uf6")}`,value: `\`\`\`${created}\`\`\``},
                    {name: `${languages(guild, "uf8")}`,value: `\`\`\`${joined}\`\`\``},
                )
            message.reply(memberEmbed)
        }

    },
    aliases: ["uf"],
    description: 'Userinfo'
}