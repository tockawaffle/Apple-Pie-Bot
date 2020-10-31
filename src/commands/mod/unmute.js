const languages = require('../../languages/languages');
const { MessageEmbed } = require('discord.js');

module.exports = {
    run: async(client, message, args) => {

        const { guild } = message
        const user = message.mentions.members.first()
        let memberId = message.content.substring(message.content.indexOf(' ') + 1)
        let member = message.guild.members.cache.get(memberId);
        let mutedRole = message.guild.roles.cache.find(x => x.name === `${languages(guild, 'M_R')}`)

        if(message.author.bot) return;
        if (!message.member.hasPermission("MANAGE_ROLES")) {
            return message.channel.send(
               `${languages(guild, 'M_C')}`
            );
        }
    
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            return message.channel.send(`${languages(guild, 'UM6_C')}`);
        }

        //Still coudnt find a way to check for the mutedRole, AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA.
        try{
            if(mutedRole && member) {

                member.roles.remove(mutedRole)
                const embed = new MessageEmbed()
                    .setTitle(`${languages(guild, 'UM3_C')}`)
                    .setDescription(`${languages(guild, 'UM4_C')}`)
                    .setColor('RANDOM')
                    .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                    .setFooter(`${languages(guild, 'UM5_C')} ${message.author.tag}`);
                message.channel.send(embed)

            } else if(mutedRole && user) {

                user.roles.remove(mutedRole)
                const embed = new MessageEmbed()
                    .setTitle(`${languages(guild, 'UM3_C')}`)
                    .setDescription(`${languages(guild, 'UM4_C')}`)
                    .setColor('RANDOM')
                    .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                    .setFooter(`${languages(guild, 'UM5_C')} ${message.author.tag}`);
                message.channel.send(embed)

            } else if(!mutedRole || !user || !member) {
                return message.reply(`${languages(guild, 'UMTR_ERR')}`) + message.channel.send(`${process.env.SRRB}`)
            }
        }catch(err) {
            console.log(err)
        }
    }, aliases: ['unmt'], description: 'Desmuta um usuario!'
}