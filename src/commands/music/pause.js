const { MessageEmbed } = require("discord.js")
const languages = require('../../util/languages/languages')

module.exports = {
    aliases: [],
    description: 'Pausa uma música',
    run: async(client, message, args) => {
        const {guild} = message
        if (!message.member.voice.channel) {
            const noChannel = new MessageEmbed()
                .setAuthor(`${message.guild.name}`, message.guild.iconURL({dynamic: true}))
                .setDescription(`${languages(guild, 'PL')}`)
                .setColor('RED')
            message.reply(noChannel)
            return
        }
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
            if (!client.player.getQueue(message)) return message.reply(`${languages(guild, 'LPNQ')}`)

            client.player.pause(message);
            const paused = new MessageEmbed()
                .setDescription(`${languages(guild, "PS")} ${client.player.getQueue(message).playing.title}`)
                .setFooter(`${languages(guild, "PS_2")} ${message.author.username}`)
                .setAuthor(`${message.guild.name}`, message.guild.iconURL({dynamic: true}))
                .setColor('RANDOM')
            message.reply(paused)
            return
        }
        if (!client.player.getQueue(message)) return message.reply(`${languages(guild, 'LPNQ')}`)

        client.player.pause(message);
        const paused = new MessageEmbed()
            .setDescription(`${languages(guild, "PS")} ${client.player.getQueue(message).playing.title}`)
            .setFooter(`${languages(guild, "PS_2")} ${message.author.username}`)
            .setAuthor(`${message.guild.name}`, message.guild.iconURL({dynamic: true}))
            .setColor('RANDOM')
        message.reply(paused)
    }
}