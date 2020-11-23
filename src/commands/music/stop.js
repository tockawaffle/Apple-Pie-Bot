module.exports = {
    aliases: [],
    description: 'Stops the music',
    run: async(client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel`);

        if (!client.player.getQueue(message)) return message.channel.send(`No music playing on this server`);
    
        client.player.setRepeatMode(message, false);
        client.player.stop(message);
    
        message.channel.send(`Music stopped in this server`);
    }
}