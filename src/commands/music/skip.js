const languages = require('../../util/languages/languages')
module.exports = {
    aliases: [],
    description: 'Skips a music',
    run: async(client, message, args) =>{ 
        const {guild} = message
        if (!message.member.voice.channel) return message.channel.send(`${languagues(guild, 'LPVP')}`);

        if (!client.player.getQueue(message)) return message.channel.send(`${languagues(guild, 'LPNQ')}`);
    
        client.player.skip(message);
    
        message.channel.send(`${languages(guild, 'SKP')} ${message.author.username}`);
    }
}