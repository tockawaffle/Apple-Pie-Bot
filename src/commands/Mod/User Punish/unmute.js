const languages = require('../../../util/languages/languages')
const { MessageEmbed } = require('discord.js');
const pageEmbed = require('discord.js-pagination')

module.exports = {
    run: async(client, message, args) => {

        const { guild } = message
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let mutedRole = message.guild.roles.cache.find(x => x.name === `${languages(guild, 'M_R')}`)

        if(!args[0]) {
            if(member === undefined) {
                member = `${languages(guild, "UN5")}`
            }
            const invalidMember = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setDescription(`${languages(guild, "M_C3")}`)
            .addFields(
                {
                    name: `${languages(guild, "M_IV")}`,
                    value: `\`\`\`${args[0] || member}\`\`\``
                },
                {
                    name: `${languages(guild, "M_C4")}`,
                    value: languages(guild, "mUsage")
                }
            )
            message.reply(invalidMember)
            return
        }

        if (!message.member.hasPermission("MANAGE_ROLES")) {
            return message.channel.send(
               `${languages(guild, 'M_C')}`
            );
        }

        try{

            if(!member.roles.cache.find(x => x.name === `${languages(guild, 'M_R')}`)) {
                const embed = new MessageEmbed()
                    .setDescription(`${languages(guild, 'UN')}`)
                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                message.reply(embed)
                return
            }

            if (mutedRole && member) {
                const embed = new MessageEmbed()
                    .setDescription(`${languages(guild, 'UN2')}`)
                    .addFields(
                        {
                            name: `${languages(guild, "UN3")}`,
                            value: `\`\`\`${member.user.username}\`\`\``
                        }
                    )
                    .setColor('RANDOM')
                    .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
                    .setFooter(`${languages(guild, 'UN4')} ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}));
                message.channel.send(embed).then((msg) => {
                    member.roles.remove(mutedRole).catch(err => {
                        msg.delete()
                        const embedError = new MessageEmbed()
                            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                            .setDescription(`${languages(guild, "M_E")}`)
                            .addFields(
                                {
                                    name: `${languages(guild, "M_E2")}`,
                                    value: `\`\`\`${err}\`\`\``
                                },
                                {
                                    name: `${languages(guild, "M_E3")}`,
                                    value: `${languages(guild, "M_E4")}`
                                }
                            )
                        const solution = new MessageEmbed()
                            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                            .setDescription(`${languages(guild, "M_E5")}`)
                            .addFields(
                                {name: `${languages(guild, "M_E6")}`,value: `[${languages(guild, "clique")}](https://www.applepiebot.xyz/permission-flags)`},
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
                    {
                        name: `${languages(guild, "M_IV")}`,
                        value: `\`\`\`${args[0] || member}\`\`\``
                    },
                    {
                        name: `${languages(guild, "M_IV2")}`,
                        value: `\`\`\`${languages(guild, "M_IV3")}\`\`\``
                    }
                )
            message.reply(invalidMember)

        }

    }, aliases: ['mt'], description: 'Para mutar um membro!'
}