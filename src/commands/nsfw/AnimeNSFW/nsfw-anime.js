const { MessageEmbed } = require('discord.js')

module.exports = {
    aliases: ['animensfw', 'anisfw'],
    description: 'Um gerador de garotas de anime com borgars',
    run: async(client, message, args) => {
        if(!message.channel.nsfw) return message.reply('Not nsfw channel uwu').then((msg) => {msg.delete({timeout: 5000})})
        const akaneko = require('akaneko')
        const pageEmbed = require('discord.js-pagination')

        if(!args[0]) {
            const error = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setDescription(`❌ Failed: Missing Args`)
                .addFields(
                    {
                        name: `You need to provide what you want to see!`,
                        value: `Go to the next page to see what you can ask to see`
                    }
                )
            const error2 = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .addFields(
                    {
                        name: `I know you like anime ass~ uwu`,
                        value: '```_anisfw ass```'
                    },
                    {
                        name: `If you don't know what it is, search it up (Not recommended)`,
                        value: '```_anisfw bdsm```'
                    },
                    {
                        name: `Basically an image of a girl sucking on a sharp blade!`,
                        value: '```_anisfw blowjob```'
                    },
                    {
                        name: `Sends a random doujin page!`,
                        value: '```_anisfw doujin```'
                    },
                    {
                        name: `So you like smelly feet huh?`,
                        value: '```_anisfw feet```'
                    },
                    {
                        name: `Female Domination?! I'm in!`,
                        value: '```_anisfw femdom```'
                    },
                    {
                        name: `Girl's that are wannabe foxes, yes`,
                        value: '```_anisfw foxgirls```'
                    },
                    {
                        name: `Basically an animated image, so yes :3`,
                        value: '```_anisfw gif```'
                    },
                    {
                        name: `Girls that wear glasses, uwu~`,
                        value: '```_anisfw glasses```'
                    },
                    {
                        name: `Wow, I won't even question your fetishes.`,
                        value: '```_anisfw netorare```'
                    },
                    {
                        name: `Maids, Maid Uniforms, etc, you know what maids are uwu`,
                        value: '```_anisfw maid```'
                    },
                    {
                        name: `I mean... just why? You like underwear? (That's cool af)`,
                        value: '```_anisfw panties```'
                    },
                    {
                        name: `School Uniforms!~ Yatta~!`,
                        value: '```_anisfw school```'
                    },
                    {
                        name: `The top part of your legs, very hot, isn't it?`,
                        value: '```_anisfw thighs```'
                    },
                    {
                        name: `Military, Konbini, Work, Nurse Uniforms, etc!~ Sexy~`,
                        value: '```_anisfw uniform```'
                    },
                    {
                        name: `Girls on Girls, and Girl's only!<3`,
                        value: '```_anisfw yuri```'
                    },
                    {
                        name: `That one part of the flesh being squeeze in thigh-highs~<3`,
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
                .setDescription('Everyone loves a good ass, right?')
                .setImage(await akaneko.nsfw.ass())
                .setFooter('Slappy~')
                .setColor('RANDOM')
            message.reply(assEmbed)
        } else if(args[0] === 'bdsm') {
            const bdsmEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setDescription('Sadistic!')
                .setImage(await akaneko.nsfw.bdsm())
                .setFooter('So, you are one of these, huh?')
                .setColor('RANDOM')
            message.reply(bdsmEmbed)
        } else if(args[0] === 'blowjob') {
            const blowjobEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setDescription('A lovely girl sucking\non a sharp blade!')
                .setImage(await akaneko.nsfw.blowjob())
                .setFooter('Blowie~')
                .setColor('RANDOM')
            message.reply(blowjobEmbed)
        } else if(args[0] === 'doujin') {
            const doujinEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setDescription('So, you prefer to test your luck?')
                .setImage(await akaneko.nsfw.doujin())
                .setFooter('Hope you are lucky!')
                .setColor('RANDOM')
            message.reply(doujinEmbed)
        } else if(args[0] === 'feet') {
            const feetEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setDescription('Kinky~')
                .setImage(await akaneko.nsfw.feet())
                .setFooter('Lovely feet, dont you think?')
                .setColor('RANDOM')
            message.reply(feetEmbed)
        } else if(args[0] === 'femdom') {
            const femdomEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setDescription('Heh')
                .setImage(await akaneko.nsfw.femdom())
                .setFooter('I can be your dom, if you want~')
                .setColor('RANDOM')
            message.reply(femdomEmbed)
        } else if(args[0] === 'glasses') {
            const glassesEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setDescription('Shiny!')
                .setImage(await akaneko.nsfw.glasses())
                .setFooter('These are the best!')
                .setColor('RANDOM')
            message.reply(glassesEmbed)
        } else if(args[0] === 'thighs') {
            const thighsEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setDescription('Those thiiiiighs')
                .setImage(await akaneko.nsfw.thighs())
                .setFooter('DAMN BOI, SHES THICK!')
                .setColor("RANDOM")
            message.reply(thighsEmbed)
        } else if(args[0] === 'foxgirls') {
            const foxEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setDescription('Wannabe foxgirls, yeah')
                .setImage(await akaneko.nsfw.foxgirl())
                .setFooter('Still cute tho')
                .setColor("RANDOM")
            message.reply(foxEmbed)
        } else if(args[0] === 'gif') {
            const gifEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setDescription('Animated ones, yay!')
                .setImage(await akaneko.nsfw.gifs())
                .setFooter('Kinky~')
                .setColor("RANDOM")
            message.reply(gifEmbed)
        } else if(args[0] == 'netorare') {
            const ntrEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setDescription('I mean... Yeah?')
                .setImage(await akaneko.nsfw.netorare())
                .setColor("RANDOM")
            message.reply(ntrEmbed)
        } else if(args[0] == 'maid') {
            const maidEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setDescription('This is what I call goodtaste!')
                .setImage(await akaneko.nsfw.maid())
                .setColor("RANDOM")
            message.reply(maidEmbed)
        } else if(args[0] == 'panties') {
            const Embed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setDescription('Panty~')
                .setImage(await akaneko.nsfw.panties())
                .setFooter('Kinky~')
                .setColor("RANDOM")
            message.reply()
        } else if(args[0] == 'school') {
            const schEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setDescription('School Uniforms, yay!')
                .setImage(await akaneko.nsfw.school())
                .setFooter('Is this even allowed?')
                .setColor("RANDOM")
            message.reply(schEmbed)
        } else if(args[0] == 'uniform') {
            const uniEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setDescription('Military, Nurse and etc, they are sexy!')
                .setImage(await akaneko.nsfw.uniform())
                .setColor("RANDOM")
            message.reply(uniEmbed)
        } else if(args[0] == 'yuri') {
            const yuriEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setDescription('Two girls, perfection!')
                .setImage(await akaneko.nsfw.yuri())
                .setColor("RANDOM")
            message.reply(yuriEmbed)
        } else if(args[0] == 'zettaiRyouiki') {
            const zettaiRyouikiEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setDescription('That one part of the flesh being squeeze in thigh-highs ~<3')
                .setImage(await akaneko.nsfw.zettaiRyouiki())
                .setColor("RANDOM")
            message.reply(zettaiRyouikiEmbed)
        }
    }
}