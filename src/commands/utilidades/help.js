const { MessageEmbed } = require('discord.js')
const languages = require('../../util/languages/languages')

module.exports = {
    aliases: ['h'],
    description: 'Comando de help',
    run: async(client, message) => {
        const { guild } = message;
        const pageEmbed = require('discord.js-pagination')
        
        const helpUtil = new MessageEmbed()
            .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
            .setTitle(`${languages(guild, 'H_C')}`)
            .addFields(
                {
                    name:  `${languages(guild, 'H_C2')}`,
                    value: '```-invite```',
                },
                {
                    name: 'Avatar:',
                    value: '```-avatar <@mention>, <userID>```'
                },
                {
                    name: 'Server Icon:',
                    value: '```-server-icon```'
                },
                {
                    name: 'Ping:',
                    value: '```-ping```'
                },
                {
                    name: 'Bot Info:',
                    value: '```-botinfo```'
                },
                {
                    name: 'User Info',
                    value: '```-userinfo <@mention>, <userID>```'
                },
                {
                    name: `${languages(guild, 'H_C3')}`,
                    value: '```-github```'
                },
                {
                    name: 'Weather:',
                    value: '```-weather```'
                },
                {
                    name: 'Server Info:',
                    value: '```-serverinfo```'
                }
            )
            .setColor('RANDOM')
        const helpMod = new MessageEmbed()
            .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
            .setTitle(`Mod Commands`)
            .addFields(
                {
                    name: 'Ban Command:',
                    value: '```-ban <@mention>, <userID>```'
                },
                {
                    name: 'Kick Command:',
                    value: '```-kick <@mention>, <userID>```'
                },
                {
                    name: 'Mute Command:',
                    value: '```-mute <@mention>, <userID>```'
                },
                {
                    name: 'Unmute Command:',
                    value: '```-unmute <@mention>, <userID>```'
                },
                {
                    name: 'Unban Command:',
                    value: '```-unban <userID>```'
                },
                {
                    name: 'Slowmode:',
                    value: '```-slowmode <messageChannel> || <#channel>```'
                },
                {
                    name: 'Remove Slowmode:',
                    value: '```-smr```'
                },
                {
                    name: 'Lockdown:',
                    value: '```-lock or -lock-channel <#channelMention>```'
                },
                {
                    name: 'Unlockdown:',
                    value: '```-unlock or -unlock-channel <#channelMention>```'
                },
                
            )
            .setColor('RANDOM')
        const helpFun = new MessageEmbed()
            .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
            .setTitle(`${languages(guild, 'H_C4')}`)
            .setColor('RANDOM')
            .addFields(
                {
                    name: `${languages(guild, 'H_C5')}`,
                    value: '```-coin```'
                },
                {
                    name: `${languages(guild, 'H_C6')}`,
                    value: '```-dice```'
                },
                {
                    name: `${languages(guild, 'H_C7')}`,
                    value: '```-hug <@mention>```'
                },
                {
                    name: `${languages(guild, 'H_C8')}`,
                    value: '```-kiss <@mention>```'
                },
                {
                    name: `${languages(guild, 'H_C9')}`,
                    value: '```-hug <@mention>```'
                },
                {
                    name: `${languages(guild, 'H_C10')}`,
                    value: '```-randomanime```'
                },
                {
                    name: `${languages(guild, 'H_C11')}`,
                    value: '```-rps```'
                },
                {
                    name: `${languages(guild, 'H_C12')}`,
                    value: '```-slap <@mention>```'
                },
                {
                    name: `${languages(guild, 'H_C13')}`,
                    value: '```-snakegame```',
                },

            )
        const helpEssentials = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setTitle(`${languages(guild, 'H_C14')}`)
            .addFields(
                {
                    name: `${languages(guild, 'H_C15')}`,
                    value: '```-setlanguage <english or portuguese>```'
                },
                {
                    name: `${languages(guild, 'H_C16')}`,
                    value: '```-backup-help```'
                },
                {
                    name: `${languages(guild, 'H_C17')}`,
                    value: '```-setgw (To add) -rgw (To remove)```'
                },
                {
                    name: `${languages(guild, 'H_C18')}`,
                    value: '```-setleft (To add) -rmvleft (To remove)```'
                },
            )
            .setColor('RANDOM')
        const helpPage = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setTitle(`${languages(guild, 'H_C19')}`)
            .addFields({
                name: `${languages(guild, 'H_C20')}`,
                value: `[${languages(guild, 'H_C21')}](https://www.applepiebot.xyz/)`
            })
            .setColor('RANDOM')
        const helpNSFW = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setTitle('NSFW Commands')
            .addFields(
                {
                    name: 'NSFW Anime:',
                    value: '-nsfw-anime'
                }
            )
        pages = [
            helpPage,
            helpEssentials,
            helpUtil,
            helpMod,
            helpFun,
        ]
        pageEmbed(message, pages)
    }
}