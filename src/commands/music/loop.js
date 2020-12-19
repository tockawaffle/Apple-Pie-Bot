const { MessageEmbed } = require("discord.js");
const languages = require('../../util/languages/languages')

module.exports = {
    aliases:[],
    description:'Loops the queue',
    run: async(client, message, args) => {
        const {guild} = message
        if (!message.member.voice.channel) return message.reply(`${languages(guild, 'LPVP')}`)

        if (!client.player.getQueue(message)) return message.reply(`${languages(guild, 'LPNQ')}`)
        
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
            const repeatMode = client.player.getQueue(message).repeatMode;

            if (repeatMode) {
                client.player.setRepeatMode(message, false);
                return message.channel.send(`${languages(guild, 'LPDS')}`);
            } else {
                client.player.setRepeatMode(message, true);
                return message.channel.send(`${languages(guild, 'LPAT')}`);
            }
        }

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