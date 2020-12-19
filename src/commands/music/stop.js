const languages = require('../../util/languages/languages')
module.exports = {
    aliases: [],
    description: 'Stops the music',
    run: async(client, message, args) => {
        const {guild} = message

        if (!message.member.voice.channel) return message.channel.send(`${languages(guild, 'LPVP')}`);

        if (!client.player.getQueue(message)) return message.channel.send(`${languages(guild, 'LPNQ')}`);
    
        let dj = message.member.roles.cache.find(x => x.name === 'DJ')
    
        const track = await client.player.nowPlaying(message);
        if(message.author.id !== track.requestedBy.id && !dj) {
            const notRequestedBy = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setDescription(`${languages(guild, "FF")}`)
                .addFields(
                    {
                        name: `${languages(guild, "FF_2")}`,
                        value: `\`\`\`${track.requestedBy.username}\`\`\``
                    }
                )
                .setFooter(`${languages(guild, "FF_3")}`)
                .setColor("RANDOM")
            message.reply(notRequestedBy)
            return
        } else if(message.author.id !== track.requestedBy.id && dj) {
            client.player.setRepeatMode(message, false);
            client.player.stop(message);
            message.channel.send(`${languages(guild, 'STP')} ${message.author.username}`);
            return
        }

        client.player.setRepeatMode(message, false);
        client.player.stop(message);
    
        message.channel.send(`${languages(guild, 'STP')} ${message.author.username}`);
    }
}