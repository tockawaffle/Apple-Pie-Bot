const { MessageEmbed } = require("discord.js")
const languages = require('../../../util/languages/languages')

module.exports = {
    aliases: [],
    description: 'Resume uma música',
    run: async(client, message) => {

        const {guild} = message
        if (!message.member.voice.channel) {
            const noChannel = new MessageEmbed()
                .setAuthor(`${message.guild.name}`, message.guild.iconURL({dynamic: true}))
                .setDescription(`${languages(guild, 'PL')}`)
                .setColor('RED')
            message.reply(noChannel)
            return
        }

        if (!client.player.getQueue(message)) return message.reply(`${languages(guild, 'LPNQ')}`)

        let dj = message.member.roles.cache.find(x => x.name === 'DJ')
    
        const track = await client.player.nowPlaying(message);
        if(message.author.id !== track.requestedBy.id && !dj) {
            const notRequestedBy = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setDescription(`${languages(guild, "FF")}`)
                .addFields(
                    {
                        name: `${languages(guild, "FF_2")}`,
                        value: `\`\`\`${track.requestedBy.username}\`\`\``
                    }
                )
                .setFooter(`${languages(guild, "FF_3")}`)
                .setColor("RANDOM")
            message.reply(notRequestedBy)
            return
        } else if(message.author.id !== track.requestedBy.id && dj) {
            client.player.resume(message);
            const resume = new MessageEmbed()
                .setDescription(`${languages(guild, "RS")} ${client.player.getQueue(message).playing.title}`)
                .setFooter(`${languages(guild, "RS_2")}: ${message.author.username}`)
                .setAuthor(`${message.guild.name}`, message.guild.iconURL({dynamic: true}))
                .setColor('RANDOM')
            message.reply(resume)
        }

        client.player.resume(message);
        const resume = new MessageEmbed()
            .setDescription(`${languages(guild, "RS")} ${client.player.getQueue(message).playing.title}`)
            .setFooter(`${languages(guild, "RS_2")}: ${message.author.username}`)
            .setAuthor(`${message.guild.name}`, message.guild.iconURL({dynamic: true}))
            .setColor('RANDOM')
        message.reply(resume)
    }
}