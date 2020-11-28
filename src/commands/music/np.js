const { MessageEmbed } = require("discord.js");
const languages = require('../../util/languages/languages')

module.exports = {
    run: async (client, message) => {

        const {guild} = message

        if (!message.member.voice.channel) return message.channel.send(`${languages(guild, 'LPVP')}`)
    
        if (!client.player.getQueue(message)) return message.channel.send(`${languages(guild, 'LPNQ')}`)
    
        const track = await client.player.nowPlaying(message);
        

        message.channel.send({
            embed: {
                color: 'RED',
                author: { name: track.title },
                footer: { text: `${languages(guild, 'NP')}` },
                fields: [
                    { name: `${languages(guild, 'NP_1')}`, value: message.member.voice.channel.name, inline: true },
                    { name: `${languages(guild, 'NP_2')}`, value: track.requestedBy.username, inline: true },
                    { name: `${languages(guild, 'NP_3')}`, value: client.player.createProgressBar(message, { timecodes: true })}
                ],
                thumbnail: { url: track.thumbnail },
                timestamp: new Date(),
            },
        });
    
    }, aliases:['playing', 'tocando-agora'], description:''
}
