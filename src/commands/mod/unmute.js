module.exports = {
    run: async (client, message, args) => {
        
        const languages = require('../../languages/languages')
        const { guild } = message
        const { discord } = require("discord.js");
        const { MessageEmbed } = require('discord.js')
        const user = message.mentions.members.first();
        if(message.author.bot) return;
        if (!message.member.hasPermission("MANAGE_ROLES")) {
            return message.channel.send(
               `${languages(guild, 'M_C')}`
            );
        }
    
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            return message.channel.send(`${languages(guild, 'UM6_C')}`);
        }
    
        if(!user) {
            try {
                const { MessageEmbed } = require('discord.js')
                let mutedRole = message.guild.roles.cache.find(x => x.name === `${languages(guild, 'M_R')}`)
                let memberId = message.content.substring(message.content.indexOf(' ') + 1)
                let member = message.guild.members.cache.get(memberId);
                if(!mutedRole) {
                    message.reply(`${languages(guild, 'UM2_C')}`)
    
                }    
                if(mutedRole) {
                        member.roles.remove(mutedRole)
                        const embed = new MessageEmbed()
                        .setTitle(`${languages(guild, 'UM3_C')}`)
                        .setDescription(`${languages(guild, 'UM4_C')}`)
                        .setColor('RANDOM')
                        .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                        .setFooter(`${languages(guild, 'UM5_C')} ${message.author.tag}`);
                        message.channel.send(embed)
                    }
            } catch (err) {
                    message.reply(`${languages(guild, 'MTR_C7')}`)
                    console.log(err)
            }
        } else {
            let mutedRole = message.guild.roles.cache.find(x => x.name === `${languages(guild, 'M_R')}`)
            if(!mutedRole) {
                message.reply(`${languages(guild, 'UM2_C')}`)
    
                }   
            if(mutedRole) {
                user.roles.remove(mutedRole)
                const embed = new MessageEmbed()
                    .setTitle(`${languages(guild, 'UM3_C')}`)
                    .setDescription(`${languages(guild, 'UM4_C')}`)
                    .setColor('RANDOM')
                    .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                    .setFooter(`${languages(guild, 'UM5_C')} ${message.author.tag}`);
                message.channel.send(embed)
            }
        }
    },
    aliases: ['desmutar', "unmt"],
    description: 'Desmuta um membro'
};
