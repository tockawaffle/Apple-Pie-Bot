const { MessageEmbed } = require("discord.js");
const languages = require('../../util/languages/languages')
const pageEmbed = require('discord.js-pagination')
module.exports = {
    aliases:[],
    description: 'Queue',
    run: async(client, message, args) => {

        const {guild} = message
        
        if (!message.member.voice.channel) return message.channel.send(`${languages(guild, 'LPVP')}`);
        const queue = client.player.getQueue(message);

        if (!queue) return message.channel.send(`${languages(guild, 'NOQ')}`);


        // `${queue.tracks.map((track, i) => {return `**#${i + 1}** - ${track.title}`}).slice(0, 5).join('\n')}`
        // ${queue.tracks.length > 5 ? `${languages(guild, 'Q_4')} **${queue.tracks.length - 5}**${languages(guild, 'Q_5')}` : `${languages(guild, 'Q_6')} **${queue.tracks.length}** ${languages(guild, 'Q_7')}`}

        const queueEmbed = new MessageEmbed()
            .setAuthor(`${languages(guild, 'Q')} - ${message.guild.name}`, guild.iconURL({dynamic: true}))
            .setDescription(
                `${languages(guild, "Q_2")} ${queue.playing.title} | ${queue.playing.author}\n\n` + (queue.tracks.map((track, i) => {
                return `**#${i + 1}** - ${track.title}`
                }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `${languages(guild, "Q_3")} **${queue.tracks.length}** ${languages(guild, "Q_4")}` : `${languages(guild, "Q_5")} **${queue.tracks.length}** ${languages(guild, Q_6)}`}`))
            .setColor("RANDOM")
            .setFooter(client.user.username, client.user.avatarURL())
        message.channel.send(queueEmbed).catch(err => {
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
                    {
                        name: `${languages(guild, "M_E6")}`,
                        value: `[Click Here](https://www.applepiebot.xyz/permission-flags)`
                    },
                    {
                        name: `${languages(guild, "M_E7")}`,
                        value: `${languages(guild, "M_E8")}`
                    }
                )
            pages = [
                embedError,
                solution
            ]
            pageEmbed(message,pages)
        })
    }
}