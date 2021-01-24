const { MessageEmbed } = require("discord.js")
const languages = require("../../../util/languages/languages")
const ms = require('ms')
module.exports = {
    aliases: ['addemoji'],
    description: 'Adiciona um Emoji',
    run: async(client, message, args) => {
        const {guild} = message
        perm = ["MANAGE_EMOJIS"]
        if(!message.member.hasPermission(perm)) {
            message.delete()
            const noPerm = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "noperm"))
                .addFields(
                    {name: `${languages(guild, "noperm2")}`,value: `${languages(guild, "noperm3")} \`${perm}\``}
                )
            message.reply(noPerm).then(msg => msg.delete({timeout: ms('15s')})); return
        } else if(!message.guild.me.hasPermission(perm)) {
            message.delete()
            const noPerm = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "nobotperm"))
                .addFields(
                    {name: `${languages(guild, "noperm2")}`,value: `${languages(guild, "noperm3")} \`${perm}\``}
                )
            message.reply(noPerm).then(msg => msg.delete({timeout: ms('15s')})); return
        }

        let name = args[0]
        if(message.attachments.first() && !name) {
            message.delete()
            const noName = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RANDOM")
                .setDescription(languages(guild, "EMJ"))
                .addFields(
                    {name: languages(guild, "ncreate3"), value: `\`\`\`${languages(guild, "EMJ2")}\`\`\``}
                )
            return message.reply(noName).then(msg => msg.delete({timeout: ms('15s')}))
        } else if(message.attachments.first() && name) {
            const embed = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RANDOM")
                .setDescription(languages(guild, "EMJ3"))
                .addFields(
                    {name: languages(guild, "EMJ4"), value: `\`\`\`${name}\`\`\``}
                )
            message.reply(embed).then((msg) => {
                guild.emojis.create(message.attachments.first().url, `${name}`).catch(err => {
                    msg.delete()
                    const errEmbed = new MessageEmbed()
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                        .setColor("RANDOM")
                        .setDescription(languages(guild, "eEMJ"))
                        .addFields(
                            {name: languages(guild, "eEMJ2"), value: `\`\`\`${err}\`\`\``},
                            {name: languages(guild, "eEMJ3"), value: `[${languages(guild, "clique")}](${message.attachments.first().url}, "${languages(guild, "eEMJ5")}") ${languages(guild, "eEMJ4")}`}
                        )
                    message.reply(errEmbed).then(msg => msg.delete({timeout: ms('15s')}))
                })
            })
        } else if(message.content.match('<a{0,1}:[a-zA-Z0-9_.]{2,32}:[0-9]{18}>')) {
            message.delete()
            const emojiID = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RANDOM")
                .setDescription(languages(guild, "EMJ5"))
                .addFields(
                    {name: languages(guild, "EMJ6"), value: `\`\`\`${languages(guild, "EMJ7")}\n\n${languages(guild, "EMJ8")}\`\`\``}
                )
            return message.reply(emojiID).then(msg => msg.delete({timeout: ms('15s')}))
        } else if(message.content.match('(https?:\/\/)?(cdn\.)?(discordapp\.com\/emojis)\/[a-zA-Z0-9_.]{18}(.gif|.png|.jpg|.jpeg).v=1') || '(https?:\/\/)?(cdn\.)?(discordapp\.com\/attachments)\/[0-9]{18}\/[0-9]{18}\/[a-zA-Z0-9-_]+(.png||.gif||.jpeg||.jpg)') {
            let attachment = args[0]; let name = args[1]
            if(!name) {
                message.delete()
                const noName = new MessageEmbed()
                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                    .setColor("RANDOM")
                    .setDescription(languages(guild, "EMJ"))
                    .addFields(
                        {name: languages(guild, "ncreate3"), value: `\`\`\`${languages(guild, "EMJ8")}\`\`\``}
                    )
                return message.reply(noName).then(msg => msg.delete({timeout: ms('15s')}))
            }
            const embed = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RANDOM")
                .setDescription(languages(guild, "EMJ3"))
                .addFields(
                    {name: languages(guild, "EMJ4"), value: `\`\`\`${name}\`\`\``}
                )
            message.reply(embed).then((msg) => {
                guild.emojis.create(attachment, `${name}`).catch(err => {
                    msg.delete()
                    const errEmbed = new MessageEmbed()
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                        .setColor("RANDOM")
                        .setDescription(languages(guild, "eEMJ"))
                        .addFields(
                            {name: languages(guild, "eEMJ2"), value: `\`\`\`${err}\`\`\``},
                            {name: languages(guild, "eEMJ3"), value: `[${languages(guild, "clique")}](${attachment}, "${languages(guild, "eEMJ5")}") ${languages(guild, "eEMJ4")}`}
                        )
                    message.reply(errEmbed).then(msg => msg.delete({timeout: ms('15s')}));
                })
            })
        }
    }
}