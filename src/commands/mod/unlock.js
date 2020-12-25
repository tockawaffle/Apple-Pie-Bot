const {MessageEmbed, Permissions} = require('discord.js');
const languages = require('../../util/languages/languages')

module.exports = {
    run: async(client, message, args) => {

        const role = message.mentions.roles.first() || message.guild.roles.everyone
        const chn = message.mentions.channels.first() || message.channel
        const flags = [
            "SEND_MESSAGES",
            "ADD_REACTIONS"
        ]

        if(chn.permissionsFor(role).has(flags)) {
            const alreadySet = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setDescription(`❌ Failed: Permissions already set`)
                .addFields(
                    {
                        name: `Permissions already set for the role:`,
                        value: `\`\`\`${role.name}\`\`\``
                    }
                )
            message.reply(alreadySet)
            return
        }

        
        if(!message.member.hasPermission("MANAGE_CHANNELS")) {
            const noUserPerm = new MessageEmbed()
                .setDescription(`❌ Failed: Missing User Permissions`)
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .addFields(
                    {
                        name: `Reason:`,
                        value: `Missing 'Manage Channels' permissions for the user`
                    }
                )
                .setColor('RED')
            message.reply(noUserPerm)
            return
        }
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
            const noClientPerm = new MessageEmbed()
                .setDescription(`❌ Failed: Missing Bot Permissions`)
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .addFields(
                    {
                        name: `Check the link below to see wich permissions the bot need and enable them after:`,
                        value: `[Click here](https://www.applepiebot.xyz/permission-flags)`
                    }
                )
                .setFooter(`It's safe to click. The link will bring you into the bot's website.`)
                .setColor('RED')
            message.reply(noClientPerm)
            return
        }

        const sucess = new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
            .setDescription(`✅ Sucess!: Channel unlock`)
            .addFields(
                {
                    name: `Channel unlocked:\n \`\`\`${chn.name}\`\`\``,
                    value: `Unlocked for the role: \`\`\`${role.name}\`\`\``
                }
            )
            .setColor('RANDOM')
        message.channel.send(sucess).then((msg) => {
            setTimeout(function() {
                chn.createOverwrite(role, {
                    SEND_MESSAGES: true,
                    ADD_REACTIONS: true
                })
            }, 1000)
        })

    },
    aliases:['ul'],
    description: ''
}