const languages = require('../../../util/languages/languages')
const {MessageEmbed} = require('discord.js');
module.exports = {
    run: async(client, message) => {


        const args = message.content.split(' ')
        args.shift(' ')
        const {guild} = message

        if(!message.member.hasPermission("MANAGE_CHANNELS")) {
            const noUserPerm = new MessageEmbed()
                .setDescription(`${languages(guild, "L_C")}`)
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .addFields(
                    {
                        name: `${languages(guild, "L_C2")}`,
                        value: `${languages(guild, "L_C8")}`
                    }
                )
                .setColor('RED')
            message.reply(noUserPerm)
            return
        }
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
            const noClientPerm = new MessageEmbed()
                .setDescription(`${languages(guild, "L_C3")}`)
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .addFields(
                    {name: `${languages(guild, "L_C4")}`,value: `[${languages(guild, "H_C21")}](https://www.tockanest.com/apple-home/permission-flags)`},
                    {name: `${languages(guild, "L_C6")}`,value: `\`\`\`${languages(guild, "L_C7")}\`\`\``}
                )
                .setFooter(`${languages(guild, "L_C5")}`)
                .setColor('RED')
            message.reply(noClientPerm)
            return
        }

        const chn = message.mentions.channels.first() || message.channel
        const role = message.mentions.roles.first() || message.guild.roles.everyone


        let reason;
        if(!message.mentions.channels.first() && message.mentions.roles.first()) {
            reason = args.slice(1).join(' ')
        } else if (!message.mentions.channels.first() && !message.mentions.roles.first()) {
            reason = args.slice().join(' ')
        } else if (message.mentions.channels.first() && message.mentions.roles.first()) {
            reason = args.slice(2).join(' ')
        } else if (message.mentions.channels.first() && !message.mentions.roles.first()) {
            reason = args.slice(1).join(' ')
        }


        const sucess = new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
            .setDescription(`${languages(guild, "L_C9")}`)
            .addFields(
                {name: `${languages(guild, "L_C10")} \`\`\`${chn.name}\`\`\``,value: `${languages(guild, "L_C11")} \`\`\`${role.name}\`\`\``},
                {name: `${languages(guild, "L_C15")}`,value: `\`\`\`${reason ? reason: `${languages(guild, "noreason")}`}\`\`\``}
            )
            .setColor('RANDOM')
            .setFooter(`${languages(guild, "L_C13")} _lock <#Channel> <#Role> <Reason>\n${languages(guild, "L_C14")} _lock`)
        message.channel.send(sucess).then((msg) => {
            setTimeout(function() {
                chn.createOverwrite(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                })
            }, 1000)
        })
    },
    aliases: ['l'],
    description: 'Tranca todos os canais de um servidor.'
}