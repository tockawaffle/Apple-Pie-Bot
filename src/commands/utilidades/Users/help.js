const { MessageEmbed } = require('discord.js')
const languages = require('../../../util/languages/languages')

module.exports = {
    aliases: ['h'],
    description: 'Comando de help',
    run: async(client, message, args) => {
        const { guild } = message;
        const pageEmbed = require('discord.js-pagination')
        
        const helpUtil = new MessageEmbed()
            .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
            .setTitle(`${languages(guild, 'H_C')}`)
            .addFields(
                {
                    name:  `${languages(guild, 'H_C2')}`,
                    value: '```<prefix>invite```',
                },
                {
                    name: 'Avatar:',
                    value: '```<prefix>avatar <@mention>, <userID>```'
                },
                {
                    name: languages(guild, "H_C30"),
                    value: '```<prefix>server-icon```'
                },
                {
                    name: 'Ping:',
                    value: '```<prefix>ping```'
                },
                {
                    name: languages(guild, "H_C31"),
                    value: '```<prefix>userinfo <@mention>, <userID>```'
                },
                {
                    name: `${languages(guild, 'H_C3')}`,
                    value: '```<prefix>github```'
                },
                {
                    name: languages(guild, "H_C32"),
                    value: '```<prefix>weather```'
                },
                {
                    name: languages(guild, "H_C33"),
                    value: '```<prefix>serverinfo```'
                },
                {
                    name: languages(guild, "H_C34"),
                    value: '```<prefix>music-help```'
                }
            )
            .setColor('RANDOM')
        const helpMod = new MessageEmbed()
            .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
            .setTitle(`Mod Commands`)
            .addFields(
                {
                    name: languages(guild, "H_C35"),
                    value: '```<prefix>ban <@mention>, <userID>```'
                },
                {
                    name: languages(guild, "H_C36"),
                    value: '```<prefix>kick <@mention>, <userID>```'
                },
                {
                    name: languages(guild, "H_C37"),
                    value: '```<prefix>mute <@mention>, <userID>```'
                },
                {
                    name: languages(guild, "H_C38"),
                    value: '```<prefix>unmute <@mention>, <userID>```'
                },
                {
                    name: languages(guild, "H_C39"),
                    value: '```<prefix>unban <userID>```'
                },
                {
                    name: languages(guild, "H_C40"),
                    value: '```<prefix>slowmode <#channel>```'
                },
                {
                    name: languages(guild, "H_C41"),
                    value: '```<prefix>lock <#channelMention> <@roleMention> <reason>```'
                },
                {
                    name: languages(guild, "H_C42"),
                    value: '```<prefix>unlock <#channelMention> <@roleMention>```'
                },
                {
                    name: languages(guild, "H_C49"),
                    value: `\`\`\`${languages(guild, "H_C50")}\`\`\``
                }
                
            )
            .setColor('RANDOM')
        const helpFun = new MessageEmbed()
            .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
            .setTitle(`${languages(guild, 'H_C4')}`)
            .setColor('RANDOM')
            .addFields(
                {
                    name: `${languages(guild, 'H_C5')}`,
                    value: '```<prefix>coin```'
                },
                {
                    name: `${languages(guild, 'H_C6')}`,
                    value: '```<prefix>dice```'
                },
                {
                    name: `${languages(guild, 'H_C7')}`,
                    value: '```<prefix>hug <@mention>```'
                },
                {
                    name: `${languages(guild, 'H_C8')}`,
                    value: '```<prefix>kiss <@mention>```'
                },
                {
                    name: `${languages(guild, 'H_C9')}`,
                    value: '```<prefix>hug <@mention>```'
                },
                {
                    name: `${languages(guild, 'H_C10')}`,
                    value: '```<prefix>randomanime```'
                },
                {
                    name: `${languages(guild, 'H_C11')}`,
                    value: '```<prefix>rps```'
                },
                {
                    name: `${languages(guild, 'H_C12')}`,
                    value: '```<prefix>slap <@mention>```'
                },
                {
                    name: `${languages(guild, 'H_C13')}`,
                    value: '```<prefix>snakegame```',
                },
                {
                    name: 'Anime',
                    value: '```<prefix>rda```\n```<prefix>animebg```'                    
                }

            )
        const helpEssentials = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setTitle(`${languages(guild, 'H_C14')}`)
            .addFields(
                {
                    name: `${languages(guild, 'H_C15')}`,
                    value: '```<prefix>setlanguage <english or portuguese>```'
                },
                {
                    name: languages(guild, "H_C43"),
                    value: '```<prefix>setprefix <Args>```'
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
                    value: '```<prefix>anisfw```\n```<prefix>bgnsfw```'
                }
            )
            .setColor('RANDOM')
        const helpCanvas = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setTitle(`${languages(guild, "H_C22")}`)
            .addFields(
                {
                    name: `Change my mind Meme`,
                    value: "```<prefix>changemymind <text>```"
                },
                {
                    name: `Facepalm`,
                    value: "```<prefix>facepalm <@mention>```"
                },
                {
                    name: `${languages(guild, "H_C23")}`,
                    value: "```<prefix>monster <@mention>```"
                },
                {
                    name: `${languages(guild, "H_C24")}`,
                    value: "```<prefix>ohno <text>```"
                },
                {
                    name: `${languages(guild, "H_C25")}`,
                    value: "```<prefix>ohshit <@mention>```"
                },
                {
                    name: `${languages(guild, "H_C26")}`,
                    value: "```<prefix>opinion <@mention> <text>```"
                },
                {
                    name: `${languages(guild, "H_C27")}`,
                    value: "```<prefix>phub <@mention> <text>```"
                },
                {
                    name: `${languages(guild, "H_C28")}`,
                    value: "```<prefix>trigger <@mention>```"
                },
                {
                    name: `${languages(guild, "H_C29")}`,
                    value: "```<prefix>ytb <@mention> <text>```"
                },
                {
                    name: `Jail`,
                    value: "```<prefix>jail <@mention>"
                }
            )
            .setColor("RANDOM")
        const helpSteam = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setTitle(`${languages(guild, "H_C48")}`)
            .addFields(
                {
                    name: languages(guild, "H_C44"),
                    value: '```<prefix>steam-register <steamID64>```' 
                },
                {
                    name: 'Steam User Info:',
                    value: '```<prefix>steamuser <steamID64>```'
                },
                {
                    name: languages(guild, "H_C45"),
                    value: `\`\`\`${languages(guild, "H_C46")}\`\`\``
                },
                {
                    name: 'Dead by Daylight Stats',
                    value: `\`\`\`${languages(guild, "H_C47")}\`\`\``
                }
            )
            .setColor("RANDOM")
        if(args[0] === undefined) {
            pages = [
                helpPage,helpEssentials,helpUtil,helpSteam,
                helpMod,helpFun,helpCanvas,helpNSFW
            ]
            pageEmbed(message, pages)
        }else if(args[0] === 'steam') {
            return message.reply(helpSteam)
        } else if(args[0] === 'page') {
            return message.reply(helpPage)
        } else if(args[0] === 'essentials') {
            return message.reply(helpEssentials)
        } else if(args[0] === 'util') {
            return message.reply(helpUtil)
        } else if(args[0] === 'mod') {
            return message.reply(helpMod)
        } else if(args[0] === 'fun') {
            return message.reply(helpFun)
        } else if(args[0] === 'nsfw') {
            return message.reply(helpNSFW)
        } else if(args[0] === 'canvas') {
            return message.reply(helpCanvas)
        } else if(args[0] === 'dev') {
            const apple = client.user
            if(message.author.bot) return;
            const initial = new MessageEmbed()
                .setDescription(`${languages(guild, "dev")}`)
                .setAuthor(apple.username, apple.avatarURL())
                .addFields(
                    {name: `${languages(guild, "dev2")}`, value: `[${languages(guild, "BF_C5")}](https://discord.gg/eyGX6pWa5V)`}
                )
                .setFooter(`${languages(guild, "I3_C")}`)
                .setColor('RANDOM')
            return message.reply(initial)
        }

    }
}