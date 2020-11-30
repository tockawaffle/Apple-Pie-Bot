const languages = require('../../util/languages/languages')
module.exports = {
    aliases: [],
    description: 'Skips a music',
    run: async(client, message, args) =>{ 
        const {guild} = message
    
        client.player.skip(message);
    
        message.channel.send(`${languages(guild, 'SKP')} ${message.author.username}`);
    }
}