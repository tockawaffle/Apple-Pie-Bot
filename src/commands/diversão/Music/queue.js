const { MessageEmbed } = require("discord.js");
const languages = require('../../../util/languages/languages')
const pageEmbed = require('discord.js-pagination')
module.exports = {
    aliases:[],
    description: 'Queue',
    run: async(client, message, args) => {

        const {guild} = message
        
        if (!message.member.voice.channel) return message.channel.send(`${languages(guild, 'LPVP')}`);
        const queue = client.player.getQueue(message);

        if (!queue) return message.channel.send(`${languages(guild, 'NOQ')}`);

        const queueEmbed = new MessageEmbed()
            .setAuthor(`${languages(guild, 'Q')}: - ${message.guild.name}`, guild.iconURL({dynamic: true}))
            .setDescription(
                `${languages(guild, "Q_2")} ${queue.playing.title} | ${queue.playing.author}` + (queue.tracks.map((track, i) => {
                return `**#${i + 1}** - ${track.title}`
                }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `${languages(guild, "Q_3")} **${queue.tracks.length}** ${languages(guild, "Q_4")}` : `${languages(guild, "Q_5")} **${queue.tracks.length}** ${languages(guild, "Q_6")}`}`))
            .setColor("RANDOM")
            .setFooter(client.user.username, client.user.avatarURL())
        message.channel.send(queueEmbed)
    }
}