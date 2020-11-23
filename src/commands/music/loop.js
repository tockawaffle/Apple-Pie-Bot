module.exports = {
    aliases:[],
    description:'Loops the queue',
    run: async(client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel`);

        if (!client.player.getQueue(message)) return message.channel.send(`No music playing on this server`);
    
        const repeatMode = client.player.getQueue(message).repeatMode;
    
        if (repeatMode) {
            client.player.setRepeatMode(message, false);
            return message.channel.send(`Repeat mode **disabled**`);
        } else {
            client.player.setRepeatMode(message, true);
            return message.channel.send(`Repeat mode **enabled**`);
        };
    }
}