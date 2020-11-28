const { MessageEmbed } = require("discord.js");
const languages = require('../../util/languages/languages')

module.exports = {
    aliases:[],
    description:'Loops the queue',
    run: async(client, message, args) => {
        const {guild} = message
        if (!message.member.voice.channel) return message.reply(`${languages(guild, 'LPVP')}`)

        if (!client.player.getQueue(message)) return message.reply(`${languages(guild, 'LPNQ')}`)
    
        const repeatMode = client.player.getQueue(message).repeatMode;
    
        if (repeatMode) {
            client.player.setRepeatMode(message, false);
            return message.channel.send(`${languages(guild, 'LPDS')}`);
        } else {
            client.player.setRepeatMode(message, true);
            return message.channel.send(`${languages(guild, 'LPAT')}`);
        };
    }
}