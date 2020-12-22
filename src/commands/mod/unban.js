const languages = require('../../util/languages/languages')

module.exports = {
    run: async(client, message, args) => {

        if(message.author.bot) return;

        const { guild } = message
        const { MessageEmbed } =require('discord.js')


        if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.channel.send(`**${message.author.username}**, ${languages(guild, 'UB_C2')}`)
        }

        if(!message.member.hasPermission('BAN_MEMBERS')) {
            message.channel.send(`${message.author.username} ${languages(guild, 'UB_C')}`)
        }
        else {
            
            try{
                let bannedMember = await message.guild.members.unban(args[0])
                if(bannedMember) {
                    const embed = new MessageEmbed()
                    .setTitle(`${languages(guild, 'UB_C3')}`)
                    .setDescription(`${bannedMember.tag} ${languages(guild, 'UB_C4')}`)
                    .setColor('RANDOM')
                    .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                    .setFooter(`${languages(guild, 'UB_C5')} ${message.author.tag}`);
                message.channel.send(embed)
                }
            }catch(err) {
                message.reply(`${languages(guild, 'UB_ERR')}`)
            }
        }

    }, aliases: ['unb'], description: 'Desbane alguém banido, durr'
}