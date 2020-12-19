module.exports = {
    run: async(client, message) => {

        const languages = require('../../util/languages/languages')
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
            if(message.mentions.has(client.user)) {
                const owner = client.users.cache.get('723185654044950539')
                const created2 = moment(client.user.createdAt).locale('pt-br').format('l')
        
                const embed = new MessageEmbed()
                    .setAuthor(`${guild.name}`, owner.avatarURL({ dynamic: true }))
                    .setDescription(`${languages(guild, 'BF_S')}`)
                    .setThumbnail(client.user.avatarURL({dynamic: true}))
                    .setColor("E7B985")
                    .addField(`${languages(guild, 'BF_C')}`, `\`\`\`${client.user.username}\`\`\``)
                    .addField(`${languages(guild, 'BF_C2')}`, `\`\`\`${owner.tag}\`\`\``)
                    .addField(`${languages(guild, 'BF_C3')}`, `\`\`\`${created2}\`\`\``)
                    .addField(`${languages(guild, 'BF_C4')}`, `[${languages(guild, 'BF_C5')}](https://github.com/The-Crow-pleb/Apple-Pie-Bot)`)
                message.reply(embed)
                return
            }
            if(member) {
                const created = moment(member.user.createdAt).locale('pt-br').format('L')
                let presence = member.user.presence.status
                if(presence === 'dnd') {
                    presence = `\`\`\`${languages(guild, 'UF_C7')}\`\`\``
                } else if (presence === 'idle') {
                    presence = `\`\`\`${languages(guild, 'UF_C8')}\`\`\``
                } else if (presence === 'online') {
                    presence = '```Online```'
                } else if (presence === 'offline') {
                    presence = '```Offline```'
                }


                const embed = new MessageEmbed()
                    .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                    .setDescription(`${languages(guild, 'UF_C2')}  ${process.env.SRVC}`)
                    .setThumbnail(member.user.avatarURL({dynamic: true}))
                    .setColor("RANDOM")
                    .addField(`${languages(guild, 'UF_C3')}`, `\`\`\`${member.user.username}\`\`\``)
                    .addField(`ID:`, `\`\`\`${member.user.id}\`\`\``)
                    .addField(`${languages(guild, 'UF_C4')} `, `\`\`\`${created}\`\`\``)
                    .addField(`${languages(guild, 'UF_C6')} `, presence)
                    .addField(`${languages(guild, 'UF_C5')} `, `\`\`\`${member.user.presence.activities}.\`\`\``)
                message.channel.send(embed);
            } else {
                message.channel.send(`${languages(guild, 'UF_ERR')}  ${args[1]}, ${languages(guild, 'UF_ERR_2')}`);
            }

        }
    },
    aliases: ["uf"],
    description: 'Userinfo'
}