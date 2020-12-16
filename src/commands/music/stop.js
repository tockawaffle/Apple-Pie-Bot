const languages = require('../../util/languages/languages')
module.exports = {
    aliases: [],
    description: 'Stops the music',
    run: async(client, message, args) => {
        const {guild} = message
        if (!message.member.voice.channel) return message.channel.send(`${languages(guild, 'LPVP')}`);

        if (!client.player.getQueue(message)) return message.channel.send(`${languages(guild, 'LPNQ')}`);
    
        client.player.setRepeatMode(message, false);
        client.player.stop(message);
    
        message.channel.send(`${languages(guild, 'STP')} ${message.author.username}`);
    }
}