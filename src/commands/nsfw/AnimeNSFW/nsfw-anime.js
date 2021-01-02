const { MessageEmbed } = require('discord.js')
const languages = require('../../../util/languages/languages')
module.exports = {
    aliases: ['animensfw', 'anisfw'],
    description: 'Perv~',
    run: async(client, message, args) => {

        const {guild} = message
        const akaneko = require('akaneko')
        const pageEmbed = require('discord.js-pagination')

        if(!message.channel.nsfw) return message.reply(`${languages(guild, "NOTNSFW")}`).then((msg) => {msg.delete({timeout: 5000})})
        if(!args[0]) {
            const error = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setDescription(`${languages(guild, "NARGS")}`)
                .addFields(
                    {
                        name: `${languages(guild, "NARGS_2")}`,
                        value: `${languages(guild, "NARGS_3")}`
                    }
                )
            const error2 = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .addFields(
                    {
                        name: `${languages(guild, "ASFW")}`,
                        value: '```_anisfw ass```'
                    },
                    {
                        name: `${languages(guild, "ASFW2")}`,
                        value: '```_anisfw bdsm```'
                    },
                    {
                        name: `${languages(guild, "ASFW3")}`,
                        value: '```_anisfw blowjob```'
                    },
                    {
                        name: `${languages(guild, "ASFW4")}`,
                        value: '```_anisfw doujin```'
                    },
                    {
                        name: `${languages(guild, "ASFW5")}`,
                        value: '```_anisfw feet```'
                    },
                    {
                        name: `${languages(guild, "ASFW6")}`,
                        value: '```_anisfw femdom```'
                    },
                    {
                        name: `${languages(guild, "ASFW7")}`,
                        value: '```_anisfw foxgirls```'
                    },
                    {
                        name: `${languages(guild, "ASFW8")}`,
                        value: '```_anisfw gif```'
                    },
                    {
                        name: `${languages(guild, "ASFW9")}`,
                        value: '```_anisfw glasses```'
                    },
                    {
                        name: `${languages(guild, "ASFW10")}`,
                        value: '```_anisfw netorare```'
                    },
                    {
                        name: `${languages(guild, "ASFW11")}`,
                        value: '```_anisfw maid```'
                    },
                    {
                        name: `${languages(guild, "ASFW12")}`,
                        value: '```_anisfw panties```'
                    },
                    {
                        name: `${languages(guild, "ASFW13")}`,
                        value: '```_anisfw school```'
                    },
                    {
                        name: `${languages(guild, "ASFW14")}`,
                        value: '```_anisfw thighs```'
                    },
                    {
                        name: `${languages(guild, "ASFW15")}`,
                        value: '```_anisfw uniform```'
                    },
                    {
                        name: `${languages(guild, "ASFW16")}`,
                        value: '```_anisfw yuri```'
                    },
                    {
                        name: `${languages(guild, "ASFW17")}`,
                        value: '```_anisfw zettaiRyouiki```'
                    },
                    
                )
            pages = [
                error,
                error2
            ]
            pageEmbed(message, pages)
        }

        if(args[0] === 'ass') {
            const assEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setDescription('Slappy~')
                .setImage(await akaneko.nsfw.ass())
                .setColor('RANDOM')
            message.reply(assEmbed)
        } else if(args[0] === 'bdsm') {
            const bdsmEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setDescription(`${languages(guild, "CASFW")}`)
                .setImage(await akaneko.nsfw.bdsm())
                .setColor('RANDOM')
            message.reply(bdsmEmbed)
        } else if(args[0] === 'blowjob') {
            const blowjobEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setDescription('Blowie~')
                .setImage(await akaneko.nsfw.blowjob())
                .setColor('RANDOM')
            message.reply(blowjobEmbed)
        } else if(args[0] === 'doujin') {
            const doujinEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setDescription(`${languages(guild, "CASFW3")}`)
                .setImage(await akaneko.nsfw.doujin())
                .setColor('RANDOM')
            message.reply(doujinEmbed)
        } else if(args[0] === 'feet') {
            const feetEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setDescription('Kinky~')
                .setImage(await akaneko.nsfw.feet())
                .setColor('RANDOM')
            message.reply(feetEmbed)
        } else if(args[0] === 'femdom') {
            const femdomEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setDescription(`${languages(guild, "CASFW4")}`)
                .setImage(await akaneko.nsfw.femdom())
                .setColor('RANDOM')
            message.reply(femdomEmbed)
        } else if(args[0] === 'glasses') {
            const glassesEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setDescription(`${languages(guild, "CASFW5")}`)
                .setImage(await akaneko.nsfw.glasses())
                .setColor('RANDOM')
            message.reply(glassesEmbed)
        } else if(args[0] === 'thighs') {
            const thighsEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setDescription(`${languages(guild, "CASFW6")}`)
                .setImage(await akaneko.nsfw.thighs())
                .setColor("RANDOM")
            message.reply(thighsEmbed)
        } else if(args[0] === 'foxgirls') {
            const foxEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setDescription(`${languages(guild, "CASFW7")}`)
                .setImage(await akaneko.nsfw.foxgirl())
                .setColor("RANDOM")
            message.reply(foxEmbed)
        } else if(args[0] === 'gif') {
            const gifEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setDescription(`${languages(guild, "CASFW8")}`)
                .setImage(await akaneko.nsfw.gifs())
                .setColor("RANDOM")
            message.reply(gifEmbed)
        } else if(args[0] == 'netorare') {
            const ntrEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setDescription(`${languages(guild, "CASFW9")}`)
                .setImage(await akaneko.nsfw.netorare())
                .setColor("RANDOM")
            message.reply(ntrEmbed)
        } else if(args[0] == 'maid') {
            const maidEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setDescription(`${languages(guild, "CASFW10")}`)
                .setImage(await akaneko.nsfw.maid())
                .setColor("RANDOM")
            message.reply(maidEmbed)
        } else if(args[0] == 'panties') {
            const pantyEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setDescription(`${languages(guild, "CASFW11")}`)
                .setImage(await akaneko.nsfw.panties())
                .setFooter('Kinky~')
                .setColor("RANDOM")
            message.reply(pantyEmbed)
        } else if(args[0] == 'school') {
            const schEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setDescription(`${languages(guild, "CASFW11 ")}`)
                .setImage(await akaneko.nsfw.school())
                .setColor("RANDOM")
            message.reply(schEmbed)
        } else if(args[0] == 'uniform') {
            const uniEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setDescription(`${languages(guild, "CASFW12")}`)
                .setImage(await akaneko.nsfw.uniform())
                .setColor("RANDOM")
            message.reply(uniEmbed)
        } else if(args[0] == 'yuri') {
            const yuriEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setDescription(`${languages(guild, "CASFW13")}`)
                .setImage(await akaneko.nsfw.yuri())
                .setColor("RANDOM")
            message.reply(yuriEmbed)
        } else if(args[0] == 'zettaiRyouiki') {
            const zettaiRyouikiEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setDescription(`${languages(guild, "CASFW14")}`)
                .setImage(await akaneko.nsfw.zettaiRyouiki())
                .setColor("RANDOM")
            message.reply(zettaiRyouikiEmbed)
        }
    }
}