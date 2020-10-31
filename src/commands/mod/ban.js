const languages = require('../../languages/languages')

module.exports = {
    run: async(client, message, args) => {

        const user = message.mentions.users.first();
        const { MessageEmbed } = require('discord.js')
        const { guild } = message

        if(message.author.bot) return;

        if(!message.member.hasPermission("BAN_MEMBERS")) {
            return message.channel.send(`**${message.author.username}**, ${languages(guild, 'B_C')}`)
        }
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.channel.send(`**${message.author.username}**, ${languages(guild, 'B_C2')}`)
        }

        if(!user) {
            try{
                let memberId = message.content.substring(message.content.indexOf(' ') + 1)
                let member = message.guild.members.cache.get(memberId);
                let bannedMember = await message.guild.members.ban(memberId)
                const embed = new MessageEmbed()
                    .setTitle(`${languages(guild, 'B_C3')}`)
                    .setDescription(`${bannedMember.tag} ${languages(guild, 'B_C4')}`)
                    .setColor('RANDOM')
                    .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                    .setFooter(`${languages(guild, 'B_C5')} ${message.author.tag}`);
                message.channel.send(embed)
            }catch(err) {
                message.reply(`${languages(guild, 'B_ERR')}`)
            }
        } else {
            await message.guild.members.ban(user)
            const embed = new MessageEmbed()
                .setTitle(`${languages(guild, 'B_C3')}`)
                .setDescription(`${user.tag} ${languages(guild, 'B_C4')}`)
                .setColor('RANDOM')
                .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                .setFooter(`${languages(guild, 'B_C5')} ${message.author.tag}`);
            message.channel.send(embed)
        }
    }, aliases: ['b'], description: 'Bane algum membro!'
}