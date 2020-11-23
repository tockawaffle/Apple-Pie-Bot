module.exports = {
    aliases: [],
    description: 'Skips a music',
    run: async(client, message, args) =>{ 
        if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel`);

        if (!client.player.getQueue(message)) return message.channel.send(`No songs currently playing`);
    
        client.player.skip(message);
    
        message.channel.send(`The current music has just been **skipped**`);
    }
}