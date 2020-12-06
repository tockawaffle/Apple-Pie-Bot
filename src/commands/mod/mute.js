const languages = require('../../util/languages/languages');
const { MessageEmbed } = require('discord.js');

module.exports = {
    run: async(client, message, args) => {

        const { guild } = message
        const user = message.mentions.members.first()
        let memberId = message.content.substring(message.content.indexOf(' ') + 1)
        let member = message.guild.members.cache.get(memberId);
        let mutedRole = message.guild.roles.cache.find(x => x.name === `${languages(guild, 'M_R')}`)

        if (!message.member.hasPermission("MANAGE_ROLES")) {
            return message.channel.send(`${languages(guild, 'M_E')} ${process.env.SHRUG}`);
        }
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            return message.channel.send(`${languages(guild, 'M6_C')} ${process.env.POUT}`);
        }
        if(user.roles.cache.find(x => x.name === `${languages(guild, 'M_R')}`)) {
            const embed = new MessageEmbed()
                .setDescription(`${languages(guild, 'MT_C')}`)
                .setAuthor(`${languages(guild, 'MT')}`)
                .setFooter(`${languages(guild, 'MT_C2')}`)
                .setTimestamp()
            message.reply(embed)
            return
        }
        try{
            if(!mutedRole && member) {

                guild.roles.create({
                    data:{
                        name: `${languages(guild, 'M_R')}`,
                        color:"grey",
                        permissions:[]
                    },
                reason:"Cargo de mutado!",
                }).then(
                    async(mutedRole) => {
                        message.guild.channels.cache.forEach(async (channel, id) => {
                            await channel.createOverwrite(mutedRole, {
                               SEND_MESSAGES: false,
                               SPEAK: false,
                               READ_MESSAGES: false,
                               ADD_REACTIONS: false
                            });
                        })
                        await member.roles.add(mutedRole)
                        const embed = new MessageEmbed()
                            .setTitle(`${languages(guild, 'M3_C')}`)
                            .setDescription(`${languages(guild, 'M4_C')}`)
                            .setColor('RANDOM')
                            .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                            .setFooter(`${languages(guild, 'M5_C')} ${message.author.tag}`);
                        message.channel.send(embed)
                    }
                )
            } else if(!mutedRole && user) {
                guild.roles.create({
                    data:{
                        name: `${languages(guild, 'M_R')}`,
                        color:"grey",
                        permissions:[]
                    },
                reason:"Cargo de mutado!",
                }).then(
                    async(mutedRole) => {
                        message.guild.channels.cache.forEach(async (channel, id) => {
                            await channel.createOverwrite(mutedRole, {
                               SEND_MESSAGES: false,
                               SPEAK: false,
                               READ_MESSAGES: false,
                               ADD_REACTIONS: false
                            });
                        })
                        await user.roles.add(mutedRole)
                        const embed = new MessageEmbed()
                            .setTitle(`${languages(guild, 'M3_C')}`)
                            .setDescription(`${languages(guild, 'M4_C')}`)
                            .setColor('RANDOM')
                            .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                            .setFooter(`${languages(guild, 'M5_C')} ${message.author.tag}`);
                        message.channel.send(embed)
                    }
                )
            }
        }catch(err) {
            console.log(err)
            message.channel.send(`Um erro ocorreu: ${err}`)
        }

        try{
            if(mutedRole && member) {
                member.roles.add(mutedRole)
                const embed = new MessageEmbed()
                    .setTitle(`${languages(guild, 'M3_C')}`)
                    .setDescription(`${languages(guild, 'M4_C')}`)
                    .setColor('RANDOM')
                    .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                    .setFooter(`${languages(guild, 'M5_C')} ${message.author.tag}`);
                message.channel.send(embed)
            } else if(mutedRole && user) {
                user.roles.add(mutedRole)
                const embed = new MessageEmbed()
                    .setTitle(`${languages(guild, 'M3_C')}`)
                    .setDescription(`${languages(guild, 'M4_C')}`)
                    .setColor('RANDOM')
                    .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                    .setFooter(`${languages(guild, 'M5_C')} ${message.author.tag}`);
                message.channel.send(embed)
            }
        }catch(err) {
            console.log(err)
            message.channel.send(`Um erro ocorreu: ${err}`)
        }


    }, aliases: ['mt'], description: 'Para mutar um membro!'
}