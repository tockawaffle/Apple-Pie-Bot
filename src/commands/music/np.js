const { MessageEmbed } = require("discord.js");
const languages = require('../../util/languages/languages')

module.exports = {
    run: async (client, message) => {

        if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel`);
    
        if (!client.player.getQueue(message)) return message.channel.send(`No music playing on this servers`);
    
        const track = await client.player.nowPlaying(message);
        

        message.channel.send({
            embed: {
                color: 'RED',
                author: { name: track.title },
                footer: { text: 'This is how we vibe today!' },
                fields: [
                    { name: 'Channel', value: message.member.voice.channel.name, inline: true },
                    { name: 'Requested by', value: track.requestedBy.username, inline: true },
                    { name: 'From playlist', value: track.fromPlaylist ? 'Yes' : 'No', inline: true },
                    { name: 'Progress bar', value: client.player.createProgressBar(message, { timecodes: true }), inline: true }
                ],
                thumbnail: { url: track.thumbnail },
                timestamp: new Date(),
            },
        });
    
    }, aliases:['playing', 'tocando-agora'], description:''
}
