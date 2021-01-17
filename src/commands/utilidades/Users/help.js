const { MessageEmbed } = require('discord.js')
const languages = require('../../../util/languages/languages')

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
                    value: '```_invite```',
                },
                {
                    name: 'Avatar:',
                    value: '```_avatar <@mention>, <userID>```'
                },
                {
                    name: languages(guild, "H_C30"),
                    value: '```_server-icon```'
                },
                {
                    name: 'Ping:',
                    value: '```_ping```'
                },
                {
                    name: languages(guild, "H_C31"),
                    value: '```_userinfo <@mention>, <userID>```'
                },
                {
                    name: `${languages(guild, 'H_C3')}`,
                    value: '```_github```'
                },
                {
                    name: languages(guild, "H_C32"),
                    value: '```_weather```'
                },
                {
                    name: languages(guild, "H_C33"),
                    value: '```_serverinfo```'
                },
                {
                    name: languages(guild, "H_C34"),
                    value: '```_music-help```'
                }
            )
            .setColor('RANDOM')
        const helpMod = new MessageEmbed()
            .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
            .setTitle(`Mod Commands`)
            .addFields(
                {
                    name: languages(guild, "H_C35"),
                    value: '```_ban <@mention>, <userID>```'
                },
                {
                    name: languages(guild, "H_C36"),
                    value: '```_kick <@mention>, <userID>```'
                },
                {
                    name: languages(guild, "H_C37"),
                    value: '```_mute <@mention>, <userID>```'
                },
                {
                    name: languages(guild, "H_C38"),
                    value: '```_unmute <@mention>, <userID>```'
                },
                {
                    name: languages(guild, "H_C39"),
                    value: '```_unban <userID>```'
                },
                {
                    name: languages(guild, "H_C40"),
                    value: '```_slowmode <#channel>```'
                },
                {
                    name: languages(guild, "H_C41"),
                    value: '```_lock <#channelMention> <@roleMention> <reason>```'
                },
                {
                    name: languages(guild, "H_C42"),
                    value: '```_unlock <#channelMention> <@roleMention>```'
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
                    value: '```_coin```'
                },
                {
                    name: `${languages(guild, 'H_C6')}`,
                    value: '```_dice```'
                },
                {
                    name: `${languages(guild, 'H_C7')}`,
                    value: '```_hug <@mention>```'
                },
                {
                    name: `${languages(guild, 'H_C8')}`,
                    value: '```_kiss <@mention>```'
                },
                {
                    name: `${languages(guild, 'H_C9')}`,
                    value: '```_hug <@mention>```'
                },
                {
                    name: `${languages(guild, 'H_C10')}`,
                    value: '```_randomanime```'
                },
                {
                    name: `${languages(guild, 'H_C11')}`,
                    value: '```_rps```'
                },
                {
                    name: `${languages(guild, 'H_C12')}`,
                    value: '```_slap <@mention>```'
                },
                {
                    name: `${languages(guild, 'H_C13')}`,
                    value: '```_snakegame```',
                },
                {
                    name: 'Anime',
                    value: '```_rda```\n```_animebg```'                    
                }

            )
        const helpEssentials = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setTitle(`${languages(guild, 'H_C14')}`)
            .addFields(
                {
                    name: `${languages(guild, 'H_C15')}`,
                    value: '```_setlanguage <english or portuguese>```'
                },
                {
                    name: `${languages(guild, 'H_C17')}`,
                    value: '```_setgw (To add) _rgw (To remove)```'
                },
                {
                    name: `${languages(guild, 'H_C18')}`,
                    value: '```_setleft (To add) _rmvleft (To remove)```'
                },
                {
                    name: languages(guild, "H_C43"),
                    value: '```_setprefix <Args>```'
                }
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
                    value: '```_anisfw```\n```_bgnsfw```'
                }
            )
            .setColor('RANDOM')
        const helpCanvas = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setTitle(`${languages(guild, "H_C22")}`)
            .addFields(
                {
                    name: `Change my mind Meme`,
                    value: "```_changemymind <text>```"
                },
                {
                    name: `Facepalm`,
                    value: "```_facepalm <@mention>```"
                },
                {
                    name: `${languages(guild, "H_C23")}`,
                    value: "```_monster <@mention>```"
                },
                {
                    name: `${languages(guild, "H_C24")}`,
                    value: "```_ohno <text>```"
                },
                {
                    name: `${languages(guild, "H_C25")}`,
                    value: "```_ohshit <@mention>```"
                },
                {
                    name: `${languages(guild, "H_C26")}`,
                    value: "```_opinion <@mention> <text>```"
                },
                {
                    name: `${languages(guild, "H_C27")}`,
                    value: "```_phub <@mention> <text>```"
                },
                {
                    name: `${languages(guild, "H_C28")}`,
                    value: "```_trigger <@mention>```"
                },
                {
                    name: `${languages(guild, "H_C29")}`,
                    value: "```_ytb <@mention> <text>```"
                }
            )
            .setColor("RANDOM")
        pages = [
            helpPage,
            helpEssentials,
            helpUtil,
            helpMod,
            helpFun,
            helpCanvas,
            helpNSFW
        ]
        pageEmbed(message, pages)
    }
}