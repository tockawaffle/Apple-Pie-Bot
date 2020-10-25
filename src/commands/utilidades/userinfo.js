module.exports = {
    run: async(client, message) => {

        const languages = require('../../languages/languages')
        const user = message.mentions.users.first()
        const { MessageEmbed } = require('discord.js');
        const { guild } = message;
        const args = message.content.split(' ');
        const moment = require('moment')

        if(args.length > 2) {
          message.channel.send(`${languages(guild, 'UF_C')}  -userinfo <user_id> | -userinfo @mention`);
        } else if(args.length === 2) {
            const member = message.mentions.members.size === 1 ? 
                message.mentions.members.first() :
                message.guild.members.cache.get(args[1]);
            if(member) {
                const created = moment(member.user.createdAt).locale('pt-br').format('L')

                const embed = new MessageEmbed()
                    .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                    .setDescription(`${languages(guild, 'UF_C2')}  ${process.env.SRVC}`)
                    .setThumbnail(member.user.avatarURL({dynamic: true}))
                    .setColor("RANDOM")
                    .addField(`${languages(guild, 'UF_C3')}`, member.user.tag)
                    .addField(`ID:`, member.user.id)
                    .addField(`${languages(guild, 'UF_C4')} `, created)
                    .addField(`${languages(guild, 'UF_C6')} `, member.user.presence.status)
                    .addField(`${languages(guild, 'UF_C5')} `, `${member.user.presence.activities}.`)
                message.channel.send(embed);
            } else {
                message.channel.send(`${languages(guild, 'UF_ERR')}  ${args[1]}, será que ele deixou de ser uma torta!?`);
            }

        }
    },
    aliases: ["uf"],
    description: 'Userinfo'
}