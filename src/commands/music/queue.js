const { MessageEmbed } = require("discord.js");
const languages = require('../../util/languages/languages')
module.exports = {
    aliases:[],
    description: 'Queue',
    run: async(client, message, args) => {

        const {guild} = message
        
        if (!message.member.voice.channel) return message.channel.send(`${languages(guild, 'LPVP')}`);
        const queue = client.player.getQueue(message);

        if (!queue) return message.channel.send(`${languages(guild, 'NOQ')}`);


        

        message.channel.send(
            {
                embed: {
                    author: {name: `${languages(guild, 'Q')} - ${message.guild.name}`},
                    description: `${languages(guild, 'Q_2')}\n${queue.playing.title}`,
                    fields: [
                        {name: `${queue.tracks.map((track, i) => {return `**#${i + 1}** - ${track.title}`}).slice(0, 5).join('\n')}`, value: `${queue.tracks.length > 5 ? `${languages(guild, 'Q_4')} **${queue.tracks.length - 5}**${languages(guild, 'Q_5')}` : `${languages(guild, 'Q_6')} **${queue.tracks.length}** ${languages(guild, 'Q_7')}`}`}
                    ],
                    color: 'RANDOM',
                    timestamp: new Date()
                }
            }
        )

        // message.channel.send(`**${languages(guild, 'Q')} - ${message.guild.name}**\n${languages(guild, 'Q_2')} ${queue.playing.title} | ${queue.playing.author}\n\n` + (queue.tracks.map((track, i) => {
        //     return `**#${i + 1}** - ${track.title} | ${track.author} (r${languages(guild, 'Q_3')} ${track.requestedBy.username})`
        // }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `${languages(guild, 'Q_4')} **${queue.tracks.length - 5}**${languages(guild, 'Q_5')}` : `${languages(guild, 'Q_6')} **${queue.tracks.length}** ${languages(guild, 'Q_7')}`}`));
    }
}