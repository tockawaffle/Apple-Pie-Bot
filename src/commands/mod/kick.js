const languages = require('../../util/languages/languages')

module.exports = {
    run: async(client, message, args) => {

        //I coudn't find a good way to implement it with userIDs because of the cache that it needs to use, since message.guilds.members.get(args) is deprecated
        //from v11, the message.guild.members.cache.get(args) will only result with the actual cache of the user, so if he has a higher role than the bot has,
        //it might repeat the command and try to kick it depiste the if(<const that mentions the userID>) returning the function

        if(message.author.bot) return;

        const { guild } = message
        const { MessageEmbed } = require('discord.js')
        const user = message.mentions.users.first();
        let target = message.mentions.members.first()

        //Perm stuff
        if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply(`${languages(guild, 'KC_C')}`)
        if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply(`${languages(guild, 'KC_ERR')}`)

        //Kick action
        try{

            if(target) {

                if(target.id === message.author.id) return message.reply(`${languages(guild, 'KC_C1')}`)
                if(target.hasPermission('ADMINISTRATOR')) return message.reply(`${languages(guild, 'KC_ERR2')}`)
                if(target.hasPermission('KICK_MEMBERS')) return message.reply(`${languages(guild, 'KC_C2')}`)
                if(target.hasPermission('BAN_MEMBERS')) return message.reply(`${languages(guild, 'KC_C6')}`)
                if(!target.kickable) return message.reply('Cannot kick him due to role hierarchy')

                const embed = new MessageEmbed()
                    .setTitle(`${languages(guild, 'KC_C3')}`)
                    .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                    .setDescription(`${user.tag} ${languages(guild, 'KC_C4')}`)
                    .setColor("#ff2050")
                    .setImage('https://i.pinimg.com/originals/6f/f1/40/6ff14029eb25bbbe796bcec5112eff67.gif')
                    .setFooter(`${message.author.username} ${languages(guild, 'KC_C5')} ${user.tag}`);
                message.channel.send(embed)
                target.kick(args[1])
            } else {
                return message.reply(`${languages(guild, 'KC_ERR3')}`)
            }
            
            
        }catch(err) {
            console.log(err)
        }

    }, aliases: ['kc'], description: 'Expulsa um usuario'
}