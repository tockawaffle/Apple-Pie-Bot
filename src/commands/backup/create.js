const backup = require('discord-backup');
const { MessageEmbed } = require('discord.js');
const moment = require('moment')
backup.setStorageFolder(__dirname+"/backups/");
const languages = require('../../util/languages/languages')

module.exports = {
    aliases: ['load-backup', 'lbackup'],
    description: 'Carrega informações sobre um backup',
    run: async(client, message, args) => {

        const created = moment(message.createdAt).format('LL')

        const {guild} = message
    
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
        const embedBackupCreate = new MessageEmbed()
            .setAuthor(`${guild.name}`,guild.iconURL({dynamic: true}))
            .setTitle(`${languages(guild, 'L_CMD')} ${guild.name}?`)
            .setDescription(`${languages(guild, 'L_CMD2')}`)
            .addField(`${languages(guild, 'L_CMD3')}`, `${languages(guild, 'L_CMD4')}`)
            .setColor('#e7b985')
    
        message.reply(embedBackupCreate).then(() => {
        message.channel.awaitMessages(response => response.content === `${languages(guild, 'L_CC')}` || response.content === `${languages(guild, 'L_CC2')}`,  {max: 1, time: 10000, errors: ['time']
        }).then((collected) => {
    
            let response = collected.first().content.toLowerCase();
    
            if (response === `${languages(guild, 'L_CC')}`) {
                backup.create(guild, {saveImages: 'url', jsonBeautify: true, maxMessagesPerChannel:0, doNotBackup: [ "emojis" ] }).then((backupData) => {
    
                    const embedBackupCreate = new MessageEmbed()
                        .setAuthor(`${guild.name}`,guild.iconURL({dynamic: true}))
                        .setTitle(`${languages(guild, 'L_CMD_B')} ${guild.name}`)
                        .addFields(
                            {
                                name: `${languages(guild, 'L_CMD_B1')}`,
                                value: `${backupData.id}`
                            },
                            {
                                name: `${languages(guild, 'L_CMD_B2')}`,
                                value: `p-load ${backupData.id}`
                            },
                            {
                                name: `${languages(guild, 'L_CMD_B3')}`,
                                value: `${languages(guild, 'L_CMD_B4')}`
                            }
                        )
                        .setFooter(`${languages(guild, 'L_CMD_B5')} ${created}`)
                        .setColor('#28cc47')
                    message.reply(embedBackupCreate)
    
                }).catch(err => message.reply(`A error ocurred: ${err}\nPlease, contact the dev.`))
            } else if (response === `${languages(guild, 'L_CC2')}`) {
    
                const embedNegative = new MessageEmbed()
                    .setAuthor(`${guild.name}`,guild.iconURL({dynamic: true}))
                    .setTitle(`${languages(guild, 'L_CMD_C')}${guild.name}`)
                    .setDescription(`${languages(guild, 'L_CMD_C2')}`)
                    .setColor('#dc505a')
                .setColor('RED')
                message.reply(embedNegative)
            }
            })
        })
    }
}