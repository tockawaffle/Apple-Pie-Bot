module.exports = {
    run: (client, message, args) => {  
        const languages = require('../../languages/languages')   
        if(message.author.bot) return;
        const { guild } = message
        const { discord } = require("discord.js");
        const { MessageEmbed } = require('discord.js')

        const user = message.mentions.users.first();

        if(!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply(`${languages(guild, 'KC_C')}`)
        }

        if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.channel.send(`${languages(guild, 'KC_C')}`);
        }
        
        if(user) {
            try {
                let target = message.mentions.members.first();

                if(target.id === message.author.id) {
                    return message.reply(`${languages(guild, 'KC_C1')}`)
                }
                if(target.hasPermission("KICK_MEMBERS", "ADMINISTRATOR", "BAN_MEMBERS")) {
                   return message.reply(`${languages(guild, 'KC_C2')}`)
                }

                const embed = new MessageEmbed()
                    .setTitle(`${languages(guild, 'KC_C3')}`)
                    .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                    .setDescription(`${user.tag} ${languages(guild, 'KC_C4')}`)
                    .setColor("#ff2050")
                    .setImage('https://i.pinimg.com/originals/6f/f1/40/6ff14029eb25bbbe796bcec5112eff67.gif')
                    .setFooter(`${message.author.username} ${languages(guild, 'KC_C5')} ${user.tag}`);
                message.channel.send(embed)
                target.kick(args[1])
            }catch(err) {
                console.log(err)
            }
        } else {
            let target = message.mentions.members.first();
            const memberId = message.content.substring(message.content.indexOf(' ') + 1)
            const member = message.guild.members.cache.get(memberId);
            if(member.id === message.author.id) {
                return message.reply(`${languages(guild, 'KC_C1')}`)
            }

            if(member.hasPermission("KICK_MEMBERS", "ADMINISTRATOR", "BAN_MEMBERS")) {
                return message.reply(`${languages(guild, 'KC_C2')}`)
            }

            const embed = new MessageEmbed()
                .setTitle(`${languages(guild, 'KC_C3')}`)
                .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                .setDescription(`${member.user.tag} ${languages(guild, 'KC_C4')}`)
                .setColor("#ff2050")
                .setImage('https://i.pinimg.com/originals/6f/f1/40/6ff14029eb25bbbe796bcec5112eff67.gif')
                .setFooter(`${message.author.username} ${languages(guild, 'KC_C5')} ${member.user.tag}`);
            message.channel.send(embed)
            member.kick(args[1])
        }

        
    },
    aliases: ['kc'],
    description: 'Retira um membro do servidor!'
  }
