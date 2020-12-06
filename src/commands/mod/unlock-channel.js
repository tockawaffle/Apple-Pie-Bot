const { MessageEmbed } = require("discord.js")
const languages = require("../../util/languages/languages")

module.exports = {
    aliases: ['unlockch'],
    description: 'Locka um canal mencionado ou o canal atual',
    run: async(client, message) => {
        const channel = message.mentions.channels.first() || message.channel
        const role = message.mentions.roles.first()
        const args = message.content.split(' ')
        args.shift(' ')

        try{
            if(channel && role) {
                const embed = new MessageEmbed() 
                    .setAuthor(`${message.guild.name}`, message.guild.iconURL({dynamic: true}))
                    .setDescription(`${languages(guild, 'UNLC')}`)
                    .addFields(
                        {
                            name: `${languages(guild, 'UNLC_C')}`,
                            value: `${channel.name}`,
                            inline: true
                        },
                        {
                            name: `${languages(guild, 'UNLC_C2')}`,
                            value: `${role.name}`
                        }
                    )
                    .setFooter(`${languages(guild, 'UNLC_C3')} ${message.author.username}`, message.author.avatarURL({dynamic: true}))
                    .setTimestamp()
                    .setColor('RANDOM')
                message.reply(embed).then((msg) => {
                    setTimeout(function() {
                        channel.createOverwrite(role, {
                            SEND_MESSAGES: true,
                            ADD_REACTIONS: true
                        })
                    }, 1000)
                })
            } else if(channel && !role) {
                const embed = new MessageEmbed() 
                .setAuthor(`${message.guild.name}`, message.guild.iconURL({dynamic: true}))
                .setDescription(`${languages(guild, UNLC)}`)
                .addFields(
                    {
                        name: `${languages(guild, 'UNLC_C')}`,
                        value: `${channel.name}`,
                        inline: true
                    }
                )
                .setFooter(`${languages(guild, 'UNLC_C3')} ${message.author.username}`, message.author.avatarURL({dynamic: true}))
                .setTimestamp()
                .setColor('RANDOM')
            message.reply(embed).then((msg) => {
                setTimeout(function() {
                    channel.createOverwrite(channel.guild.roles.everyone, {
                        SEND_MESSAGES: true,
                        ADD_REACTIONS: true
                    })
                }, 1000)
            })
            }
        } catch(err) {
            console.log(err)
            message.reply(`An error ocurred: ${err}\nPlease, join the support channel or contact the dev with: -dev-c <Your repport>`)
        }

    }
}