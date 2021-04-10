const { MessageEmbed } = require('discord.js')
const languages = require('../../../util/languages/languages')
const newPrefixSchema = require('../../../configs/db/schemas/prefix-schema')

module.exports = {
    aliases: ['h'],
    description: 'Comando de help',
    run: async(client, message, args) => {
        
        const { guild } = message;
        const prefix = await newPrefixSchema.findOne({_id: guild.id})
        const realPrefix = prefix.prefix
        const pageEmbed = require('discord.js-pagination')
        
        const helpUtil = new MessageEmbed()
            .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
            .setTitle(`⚙ ${languages(guild, 'H_C')}`)
            .addFields(
                {
                    name: 'Avatar:',
                    value: `\`\`\`${realPrefix}avatar <@mention>, <userID>\`\`\``
                },
                {
                    name: languages(guild, "H_C30"),
                    value: `\`\`\`${realPrefix}server-icon\`\`\``
                },
                {
                    name: 'Ping:',
                    value: `\`\`\`${realPrefix}ping\`\`\``
                },
                {
                    name: languages(guild, "H_C31"),
                    value: `\`\`\`${realPrefix}userinfo <?@mention>, <?userID>\`\`\``
                },
                {
                    name: languages(guild, "H_C32"),
                    value: `\`\`\`${realPrefix}weather\`\`\``
                },
                {
                    name: languages(guild, "H_C33"),
                    value: `\`\`\`${realPrefix}serverinfo\`\`\``
                },
                {
                    name: languages(guild, "H_C34"),
                    value: `\`\`\`${realPrefix}music-help\`\`\``
                }
            )
            .setColor('RANDOM')
        const helpMod = new MessageEmbed()
            .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
            .setTitle(`🚔 Mod Commands`)
            .addFields(
                {
                    name: languages(guild, "H_C35"),
                    value: `\`\`\`${realPrefix}ban <@mention>, <userID>\`\`\``
                },
                {
                    name: languages(guild, "H_C36"),
                    value: `\`\`\`${realPrefix}kick <@mention>, <userID>\`\`\``
                },
                {
                    name: languages(guild, "H_C37"),
                    value: `\`\`\`${realPrefix}mute <@mention>, <userID>\`\`\``
                },
                {
                    name: languages(guild, "H_C38"),
                    value: `\`\`\`${realPrefix}unmute <@mention>, <userID>\`\`\``
                },
                {
                    name: languages(guild, "H_C39"),
                    value: `\`\`\`${realPrefix}unban <userID>\`\`\``
                },
                {
                    name: languages(guild, "H_C40"),
                    value: `\`\`\`${realPrefix}slowmode <#channel>\`\`\``
                },
                {
                    name: languages(guild, "H_C41"),
                    value: `\`\`\`${realPrefix}lock <#channelMention> <@roleMention> <reason>\`\`\``
                },
                {
                    name: languages(guild, "H_C42"),
                    value: `\`\`\`${realPrefix}unlock <#channelMention> <@roleMention>\`\`\``
                },
                {
                    name: languages(guild, "H_C49"),
                    value: `\`\`\`${languages(guild, "H_C50")}\`\`\``
                }
                
            )
            .setColor('RANDOM')
        const helpFun = new MessageEmbed()
            .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
            .setTitle(`🎭 ${languages(guild, 'H_C4')}`)
            .setColor('RANDOM')
            .addFields(
                {
                    name: `${languages(guild, 'H_C5')}`,
                    value: `\`\`\`${realPrefix}coin\`\`\``
                },
                {
                    name: `${languages(guild, 'H_C6')}`,
                    value: `\`\`\`${realPrefix}dice\`\`\``
                },
                {
                    name: `${languages(guild, 'H_C7')}`,
                    value: `\`\`\`${realPrefix}hug <@mention>\`\`\``
                },
                {
                    name: `${languages(guild, 'H_C8')}`,
                    value: `\`\`\`${realPrefix}kiss <@mention>\`\`\``
                },
                {
                    name: `${languages(guild, 'H_C9')}`,
                    value: `\`\`\`${realPrefix}hug <@mention>\`\`\``
                },
                {
                    name: `${languages(guild, 'H_C10')}`,
                    value: `\`\`\`${realPrefix}randomanime\`\`\``
                },
                {
                    name: `${languages(guild, 'H_C11')}`,
                    value: `\`\`\`${realPrefix}rps\`\`\``
                },
                {
                    name: `${languages(guild, 'H_C12')}`,
                    value: `\`\`\`${realPrefix}slap <@mention>\`\`\``
                },
                {
                    name: `${languages(guild, 'H_C13')}`,
                    value: `\`\`\`${realPrefix}snakegame\`\`\``,
                },
                {
                    name: 'Anime',
                    value: `\`\`\`${realPrefix}rda\n${realPrefix}animebg\`\`\``                    
                }

            )
        const helpEssentials = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setTitle(`🛠 ${languages(guild, 'H_C14')}`)
            .addFields(
                {
                    name: `${languages(guild, 'H_C15')}`,
                    value: `\`\`\`${realPrefix}setlanguage <english or portuguese>\`\`\``
                },
                {
                    name: languages(guild, "H_C43"),
                    value: `\`\`\`${realPrefix}setprefix <Args>\`\`\``
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
            .setTitle('🔞 NSFW')
            .addFields(
                {
                    name: 'NSFW Anime:',
                    value: `\`\`\`${realPrefix}anisfw\n${realPrefix}bgnsfw\`\`\``
                }
            )
            .setColor('RANDOM')
        const helpCanvas = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setTitle(`🖼 ${languages(guild, "H_C22")}`)
            .addFields(
                {
                    name: `Change my mind Meme`,
                    value: `\`\`\`${realPrefix}changemymind <text>\`\`\``
                },
                {
                    name: `Facepalm`,
                    value: `\`\`\`${realPrefix}facepalm <@mention>\`\`\``
                },
                {
                    name: `${languages(guild, "H_C23")}`,
                    value: `\`\`\`${realPrefix}monster <@mention>\`\`\``
                },
                {
                    name: `${languages(guild, "H_C24")}`,
                    value: `\`\`\`${realPrefix}ohno <text>\`\`\``
                },
                {
                    name: `${languages(guild, "H_C25")}`,
                    value: `\`\`\`${realPrefix}ohshit <@mention>\`\`\``
                },
                {
                    name: `${languages(guild, "H_C26")}`,
                    value: `\`\`\`${realPrefix}opinion <@mention> <text>\`\`\``
                },
                {
                    name: `${languages(guild, "H_C27")}`,
                    value: `\`\`\`${realPrefix}phub <@mention> <text>\`\`\``
                },
                {
                    name: `${languages(guild, "H_C28")}`,
                    value: `\`\`\`${realPrefix}trigger <@mention>\`\`\``
                },
                {
                    name: `${languages(guild, "H_C29")}`,
                    value: `\`\`\`${realPrefix}ytb <@mention> <text>\`\`\``
                },
                {
                    name: `Jail`,
                    value: `\`\`\`${realPrefix}jail <@mention>\`\`\``
                }
            )
            .setColor("RANDOM")
        const helpSteam = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setTitle(`${languages(guild, "H_C48")}`)
            .addFields(
                {
                    name: languages(guild, "H_C44"),
                    value: `\`\`\`${realPrefix}steam-register <steamID64>\`\`\`` 
                },
                {
                    name: 'Steam User Info:',
                    value: `\`\`\`${realPrefix}steamuser <steamID64>\`\`\``
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
        const helpCrypto = new MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
        .setColor("RANDOM")
        .setTitle(`<:bitcoin:811435136678756402> ${languages(guild, 'crypt_help2')}`)
        .addFields(
            {name: languages(guild, 'crypt_help'), value: `\`\`\`${realPrefix}crypto-help\`\`\``}
        )
        const helpMath = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setTitle(`${languages(guild, "H_C51")}`)
            .setColor("RANDOM")
            .addFields(
                {
                    name: languages(guild, "H_C52"), value: `\`\`\`${realPrefix}add <number1> <number2>\`\`\``
                },
                {
                    name: languages(guild, "H_C53"), value: `\`\`\`${realPrefix}minus <number1> <number2>\`\`\`` 
                },
                {
                    name: languages(guild, "H_C54"), value: `\`\`\`${realPrefix}mp <number1> <number2>\`\`\`` 
                },
                {
                    name: languages(guild, "H_C55"), value: `\`\`\`${realPrefix}dvs <number1> number2>\`\`\`` 
                }
            )
        if(!args) {
            pages = [
                helpPage,helpEssentials,helpUtil,helpCrypto,helpSteam,
                helpMod,helpMath,helpFun,helpCanvas,helpNSFW
            ]
            return pageEmbed(message, pages)
        }
        if(args[0] === undefined) {
            pages = [
                helpPage,helpEssentials,helpUtil,helpCrypto,helpSteam,
                helpMod,helpMath,helpFun,helpCanvas,helpNSFW
            ]
            pageEmbed(message, pages)
        } else if(args[0] === "math") {
            return message.reply(helpMath)
        } else if(args[0] === 'steam') {
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