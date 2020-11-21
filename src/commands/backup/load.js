const backup = require('discord-backup');
const { MessageEmbed } = require('discord.js');
const moment = require('moment')
backup.setStorageFolder(__dirname+"/backups/");
const languages = require('../../util/languages/languages')

module.exports = {
    aliases: [],
    description: 'Carrega um backup.',
    run: async(client, message) => {
        const {guild} = message
        const args = message.content.split(' ');
        args.shift()
        let backupId = args[0]
    
        const created = moment(message.createdAt).format('LL')
    
        if(!message.member.hasPermission('ADMINISTRATOR')) {
            const embedNoPerms = new MessageEmbed()
                .setAuthor(`${guild.name}`,guild.iconURL({dynamic: true}))
                .setTitle(`${languages(guild, 'L_CMD_P')}`)
                .setDescription(`${languages(guild, 'L_CMD_P2')} ${guild.name}`)
                .addField(`${languages(guild, 'L_CMD_P3')}`, `${languages(guild, 'L_CMD_P4')}`)
                .setColor('#dc505a')
            message.reply(embedNoPerms)
            return
        }
    
        const embedLoad = new MessageEmbed()
            .setAuthor(`${guild.name}`,guild.iconURL({dynamic: true}))
            .setTitle(`${languages(guild, 'L_CMD')} ${guild.name}?`)
            .setDescription(`${languages(guild, 'L_CMD2')}`)
            .addField(`${languages(guild, 'L_CMD3')}`, `${languages(guild, 'L_CMD4')}`)
            .setColor('#e7b985')
    
        message.reply(embedLoad).then(() => {
            message.channel.awaitMessages(response => response.content === `${languages(guild, 'L_CC')}` || response.content === `${languages(guild, 'L_CC2')}`,  {max: 1, time: 10000, errors: ['time']
        }).then((collected) => {
            let response = collected.first().content.toLowerCase();
            if (response === `${languages(guild, 'L_CC')}`) {
                backup.load(backupId, guild).then(() => {
                    const embedBackupLoad = new MessageEmbed()
                        .setAuthor(`${guild.name}`,guild.iconURL({dynamic: true}))
                        .setTitle(`${languages(guild, 'LL')} ${guild.name}`)
                        .addFields(
                            {
                                name: `${languages(guild, 'LL2')} ${guild.name}`,
                                value: `${backupData.id}`
                            },
                            {
                                name: `${languages(guild, 'LL3')} ${guild.name}`,
                                value: `${message.guild.name}`
                            },
                            {
                                name: `${languages(guild, 'LL4')} ${guild.name}`,
                                value: `${languages(guild, 'LL5')} ${guild.name} " \`${backupData.id}\` " ${languages(guild, 'LL5_2')} ${guild.name}`
                            }
                        )
                        .setFooter(`${languages(guild, 'LL6')} ${guild.name} ${created}.`)
                        .setColor('#28cc47')
                    message.author.send(embedBackupLoad)
                    backup.remove(backupId)
    
                }).catch(err => message.channel.send(`${err}`))
            } else if (response === `${languages(guild, 'L_CC2')}`) {
    
                const embedNegative = new MessageEmbed()
                    .setAuthor(`${guild.name}`,guild.iconURL({dynamic: true}))
                    .setTitle(`${languages(guild, 'LLC')} ${guild.name} ${guild.name}`)
                    .setDescription(`${languages(guild, 'LLC2')} ${guild.name} ${message.author.username}`)
                    .setColor('#dc505a')
                .setColor('RED')
                message.reply(embedNegative)
                }
            })
        })
    }
}