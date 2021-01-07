const languages = require('../../util/languages/languages')

module.exports = {
    run: async(client, message, args) => {

        if(message.author.bot) return;

        const { guild } = message
        const { MessageEmbed } = require('discord.js')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply(`${languages(guild, 'KC_C')}`)
        if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply(`${languages(guild, 'KC_ERR')}`)

        try{

            if(user) {

                if(user.id === message.author.id) return message.reply(`${languages(guild, 'KC_C1')}`)
                if(user.hasPermission('ADMINISTRATOR')) return message.reply(`${languages(guild, 'KC_ERR2')}`)
                if(user.hasPermission('KICK_MEMBERS')) return message.reply(`${languages(guild, 'KC_C2')}`)
                if(user.hasPermission('BAN_MEMBERS')) return message.reply(`${languages(guild, 'KC_C6')}`)
                if(!user.kickable) return message.reply('Cannot kick him due to role hierarchy')

                const embed = new MessageEmbed()
                    .setTitle(`${languages(guild, 'KC_C3')}`)
                    .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                    .setDescription(`${user.user.username} ${languages(guild, 'KC_C4')}`)
                    .setColor("#ff2050")
                    .setImage('https://i.pinimg.com/originals/6f/f1/40/6ff14029eb25bbbe796bcec5112eff67.gif')
                    .setFooter(`${message.author.username} ${languages(guild, 'KC_C5')} ${user.user.tag}`);
                message.channel.send(embed)
                user.kick()
            } else {
                return message.reply(`${languages(guild, 'KC_ERR3')}`)
            }
            
            
        }catch(err) {
            console.log(err)
        }

    }, aliases: ['kc'], description: 'Expulsa um usuario'
}