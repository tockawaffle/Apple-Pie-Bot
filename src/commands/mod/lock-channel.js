const { MessageEmbed } = require("discord.js")
const languages = require("../../util/languages/languages")

module.exports = {
    aliases: ['lockch'],
    description: 'Locka um canal mencionado ou o canal atual',
    run: async(client, message) => {
        const channel = message.mentions.channels.first() || message.channel
        const role = message.mentions.roles.first()
        const args = message.content.split(' ')
        args.shift(' ')

        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            const noPerm = new MessageEmbed()
                .setAuthor(`${languages(guild, 'LCKP')}`)
                .setColor('RED')
                .setDescription(`${languages(guild, 'LCKP2')}`)
        }

        try{
            if(channel && role) {
                const embed = new MessageEmbed() 
                    .setAuthor(`${message.guild.name}`, message.guild.iconURL({dynamic: true}))
                    .setDescription(`${languages(guild, 'LCK')}`)
                    .addFields(
                        {
                            name: `${languages(guild, 'LCK_C')}`,
                            value: `${channel.name}`,
                            inline: true
                        },
                        {
                            name: `${languages(guild, 'LCK_C1')}`,
                            value: `${role.name}`
                        }
                    )
                    .setFooter(`${languages(guild, 'LCK_C2')} ${message.author.username}`, message.author.avatarURL({dynamic: true}))
                    .setTimestamp()
                    .setColor('RANDOM')
                message.reply(embed).then((msg) => {
                    setTimeout(function() {
                        channel.createOverwrite(role, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false
                        })
                    }, 1000)
                })
            } else if(channel && !role) {
                const embed = new MessageEmbed() 
                .setAuthor(`${message.guild.name}`, message.guild.iconURL({dynamic: true}))
                .setDescription(`${languages(guild, 'LCK')}`)
                .addFields(
                    {
                        name: `${languages(guild, 'LCK_C')}`,
                        value: `${channel.name}`,
                        inline: true
                    }
                )
                .setFooter(`${languages(guild, 'LCK_C2')} ${message.author.username}`, message.author.avatarURL({dynamic: true}))
                .setTimestamp()
                .setColor('RANDOM')
            message.reply(embed).then((msg) => {
                setTimeout(function() {
                    channel.createOverwrite(channel.guild.roles.everyone, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
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