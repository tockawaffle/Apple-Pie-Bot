const languages = require('../../../util/languages/languages')
const { MessageEmbed } = require('discord.js');
const pageEmbed = require('discord.js-pagination')

module.exports = {
    run: async(client, message, args) => {

        const { guild } = message
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let mutedRole = message.guild.roles.cache.find(x => x.name === `${languages(guild, 'M_R')}`)
        if (!message.member.hasPermission("MANAGE_ROLES")) {
            return message.channel.send(
               `${languages(guild, 'M_C')}`
            );
        }

        if(!member) {
            const invalidMember = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setDescription(`${languages(guild, "M_C3")}`)
            .addFields(
                {name: `${languages(guild, "M_IV")}`,value: `\`\`\`${args[0]}\`\`\``},
                {name: `${languages(guild, "M_C4")}`, value: languages(guild, "umUsage")}
            )
            message.reply(invalidMember)
            return
        }
        let reasoning;
        let other = ["ADMINISTRATOR" || "KICK_MEMBERS" || "KICK_MEMBERS" || "BAN_MEMBERS" || "MANAGE_CHANNELS" || "MANAGE_GUILD"]
        if(member.id === message.author.id) {
            const sameUser = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "same"))
            return message.reply(sameUser).then(msg => msg.delete({timeout: 10000}))
        } else if(member.id === guild.owner.id) {
            const owner = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "owner"))
                .addField(languages(guild, "owner2"), languages(guild, "owner3"))
            return message.reply(owner).then(msg => msg.delete({timeout: 10000}))
        } else if(message.member.roles.highest.position <= member.roles.highest.position && message.author.id !== message.guild.owner.id) {
            reasoning = languages(guild, "moreperms3")
            const hasPerm = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "moreperms"))
                .addFields(
                    {name: languages(guild, "moreperms2"), value: `\`\`\`${reasoning}\`\`\``}
                )
            return message.reply(hasPerm).then(msg => msg.delete({timeout: 10000}))
        } else if(member.hasPermission(other) && message.author.id !== message.guild.owner.id) {
            reasoning = languages(guild, "moreperms4")
            const hasPerm = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "moreperms"))
                .addFields(
                    {name: languages(guild, "moreperms2"), value: `\`\`\`${reasoning}: ${other}\`\`\``}
                )
            return message.reply(hasPerm).then(msg => msg.delete({timeout: 10000}))
        } 
        
        if(!args[0]) {
            if(member === undefined) {
                member = `${languages(guild, "UN5")}`
            }
            const invalidMember = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setDescription(`${languages(guild, "M_C3")}`)
            .addFields(
                {name: `${languages(guild, "M_IV")}`,value: `\`\`\`${args[0] || member}\`\`\``},
                {name: `${languages(guild, "M_C4")}`, value: languages(guild, "umUsage")}
            )
            message.reply(invalidMember)
            return
        }

        try{

            if(member.roles.cache.find(x => x.name === `${languages(guild, 'M_R')}`)) {
                const embed = new MessageEmbed()
                    .setDescription(`${languages(guild, 'M_C2')}`)
                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                return message.reply(embed)
            }

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
                               SEND_MESSAGES: false, SPEAK: false, READ_MESSAGES: false, ADD_REACTIONS: false
                            });
                        })
                        const embed = new MessageEmbed()
                            .setDescription(`${languages(guild, 'M2_C')}`)
                            .setColor('RANDOM')
                            .addFields(
                                {name: `${languages(guild, "M3_C")}`, value: `\`\`\`${member.user.username}\`\`\``}
                            )
                            .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                            .setFooter(`${languages(guild, 'M4_C')} ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}));
                        message.channel.send(embed).then((msg) => {
                            member.roles.add(mutedRole).catch(err => {
                                msg.delete()
                                const embedError = new MessageEmbed()
                                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                                    .setDescription(`${languages(guild, "M_E")}`)
                                    .addFields(
                                        {name: `${languages(guild, "M_E2")}`, value: `\`\`\`${err}\`\`\``},
                                        {name: `${languages(guild, "M_E3")}`, value: `${languages(guild, "M_E4")}`}
                                    )
                                const solution = new MessageEmbed()
                                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                                    .setDescription(`${languages(guild, "M_E5")}`)
                                    .addFields(
                                        {name: `${languages(guild, "M_E7")}`,value: `${languages(guild, "M_E8")}`}
                                    )
                                pages = [embedError, solution]
                                pageEmbed(message,pages)
                            })
                        })
                    }
                )
            } else if (mutedRole && member) {
                const embed = new MessageEmbed()
                    .setDescription(`${languages(guild, 'M2_C')}`)
                    .addFields(
                        {name: `${languages(guild, "M3_C")}`, value: `\`\`\`${member.user.username}\`\`\``}
                    )
                    .setColor('RANDOM')
                    .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                    .setFooter(`${languages(guild, 'M4_C')} ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}));
                message.channel.send(embed).then((msg) => {
                    member.roles.add(mutedRole).catch(err => {
                        msg.delete()
                        const embedError = new MessageEmbed()
                            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                            .setDescription(`${languages(guild, "M_E")}`)
                            .addFields(
                                {name: `${languages(guild, "M_E2")}`, value: `\`\`\`${err}\`\`\``},
                                {name: `${languages(guild, "M_E3")}`, value: `${languages(guild, "M_E4")}`}
                            )
                        const solution = new MessageEmbed()
                            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                            .setDescription(`${languages(guild, "M_E5")}`)
                            .addFields(
                                {name: `${languages(guild, "M_E6")}`,value: `[${languages(guild, "clique")}](https://www.tockanest.com/apple-home/permission-flags)`},
                                {name: `${languages(guild, "M_E7")}`,value: `${languages(guild, "M_E8")}`}
                            )
                        pages = [
                            embedError,
                            solution
                        ]
                        pageEmbed(message,pages)
                    })
                })
            }
        }catch(err) {
            const invalidMember = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setDescription(`${languages(guild, "M_C3")}`)
                .addFields(
                    {name: `${languages(guild, "M_IV")}`, value: `\`\`\`${args[0] || member}\`\`\``},
                    {name: `${languages(guild, "M_IV2")}`,value: `\`\`\`${languages(guild, "M_IV3")}\`\`\``}
                )
            message.reply(invalidMember)

        }

    }, aliases: ['mt'], description: 'Para mutar um membro!'
}