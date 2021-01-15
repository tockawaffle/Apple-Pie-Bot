const languages = require('../../../util/languages/languages')
const {MessageEmbed} = require('discord.js')
module.exports = {
    run: async(client, message, args) => {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const {guild} = message

        if(!message.member.hasPermission('BAN_MEMBERS')) {
            const noPerm = new MessageEmbed()
                .setDescription(`${languages(guild, 'B_C4')}`)
                .addFields(
                    {
                        name: `${languages(guild, 'B_C')} \`\`\`${message.author.username}\`\`\`${languages(guild, 'B_C2')}`,
                        value: `${languages(guild, 'B_C3')}`
                    }
                )
                .setColor('RED')
            message.reply(noPerm)
            return
        }
        if(!message.guild.me.hasPermission('BAN_MEMBERS')) {
                const noPerm = new MessageEmbed()
                .setDescription(`${languages(guild, 'B_C5')}`)
                .addFields(
                    {
                        name: `${languages(guild, 'B_C')} \`\`\`${message.author.username}\`\`\`${languages(guild, 'B_C6')}`,
                        value: `${languages(guild, 'B_C7')}`
                    }
                )
                .setColor('RED')
            message.reply(noPerm)
            return
        }

        if(!member) {
            const noMember = new MessageEmbed()
                .setDescription(`${languages(guild, 'B_C8')}`)
                .addField(`${languages(guild, 'B_C9')}`, `\`\`\`-ban <@mention> or <userID> <reason>\`\`\``)
                .setColor('RED')
            message.reply(noMember)
            return
        }
        if(!member.bannable) {
            const noPerm = new MessageEmbed()
                .setDescription(`${languages(guild, 'B_C10')}`)
                .addFields(
                    {
                        name: `${languages(guild, 'B_C')} \`\`\`${message.author.username}\`\`\`${languages(guild, 'B_C11')}`,
                        value: `${languages(guild, 'B_C12')}`
                    }
                )
                .setColor('RED')
            message.reply(noPerm)
            return
        }
        let reason = args.slice(1).join(' ')

        const banSucess = new MessageEmbed()
            .setDescription(`${languages(guild, 'B_C13')}`)
            .setColor('RANDOM')
            .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
            .addFields(
                {
                    name: `${languages(guild, 'B_C14')}`,
                    value: `\`\`\`${member.user.username}\`\`\``
                },
                {
                    name: `${languages(guild, 'B_C15')}`,
                    value: `\`\`\`${reason ? reason: `${languages(guild, 'B_C16')}`}\`\`\``
                },
                {
                    name: `${languages(guild, 'B_C17')}`,
                    value: `\`\`\`${message.author.username}\`\`\``
                }
            )
        message.reply(banSucess)
        await member.ban({reason: `${reason}`})
    }, aliases: ['b'], description: 'Bane algum membro!'
}