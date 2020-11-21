const backup = require('discord-backup');
const { MessageEmbed } = require('discord.js');
const moment = require('moment')
backup.setStorageFolder(__dirname+"/backups/");
    const languages = require('../../util/languages/languages')

module.exports = {
    aliases: ['backupif', 'ifbackup'],
    description:'Carrega informações sobre um backup',
    run: async(client, message) => {
        const {guild} = message
        const args = message.content.split(' ');
        args.shift()
        let backupId = args[0]

        const embedNotFound = new MessageEmbed()
        .setAuthor(`${guild.name}`,guild.iconURL({dynamic: true}))
        .setTitle(`${languages(guild, 'L1')}`)
        .setColor('#dc505a')

        backup.fetch(backupId).then((backupInfos) => {
                    
            const created = moment(backupInfos.data.createdTimestamp).format('LL')
            const embedBackupLoad = new MessageEmbed()
                .setAuthor(`${guild.name}`,guild.iconURL({dynamic: true}))
                .setTitle(`${languages(guild, 'L2')}`)
                .addFields(
                    {
                        name: `${languages(guild, 'L3')}`,
                        value: `${backupInfos.id}`
                    },
                    {
                        name: `${languages(guild, 'L4')}`,
                        value: `${backupInfos.data.name}`
                    },
                    {
                        name:  `${languages(guild, 'L5')}`,
                        value: `${backupInfos.data.guildID}`
                    },
                    {
                        name: `${languages(guild, 'L6')}`,
                        value: `${backupInfos.size}mb`
                    },
                    {
                        name: `${languages(guild, 'L7')}`,
                        value: `${created}`
                    }
                )
                .setFooter(`${languages(guild, 'L8')} ${message.guild.name}`)
                .setColor('#28cc47')
            message.channel.send(embedBackupLoad)
        })
    }
}