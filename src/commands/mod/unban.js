module.exports = {
    run: async(client, message, args) => {

        const languages = require('../../languages/languages')
        if(message.author.bot) return;
        const { guild } = message
        const { MessageEmbed } =require('discord.js')
        if(!message.member.hasPermission('BAN_MEMBERS')) {
            message.channel.send(`${message.author.username} ${languages(guild, 'UB_C')}`)
        }
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.channel.send(`**${message.author.username}**, ${languages(guild, 'UB_C2')}`)
        }
        else {
            let memberId = message.content.substring(message.content.indexOf(' ') + 1)
            let member = message.guild.members.cache.get(memberId);
            try {
                let bannedMember = await message.guild.members.unban(memberId);
                if(bannedMember) {
                    const embed = new MessageEmbed()
                    .setTitle(`${languages(guild, 'UB_C3')}`)
                    .setDescription(`${bannedMember.tag} ${languages(guild, 'UB_C4')}`)
                    .setColor('RANDOM')
                    .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                    .setFooter(`${languages(guild, 'UB_C5')} ${message.author.tag}`);
                    message.channel.send(embed)
                }
        }
        catch(err) {
            message.reply(`${languages(guild, 'UB_ERR')}`)
            }
        }
    },
    aliases: ['desbanir', "unb"],
    description: 'Desbane um membro'
}
