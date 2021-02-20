const { MessageEmbed } = require("discord.js");
const languages = require('../../util/languages/languages')

module.exports = (player, error, message) => {
    const {guild} = message
    switch (error) {
        case 'NotPlaying':
            message.channel.send(`${languages(guild, 'EEVT')}`)
            break;
        case 'NotConnected':
            message.channel.send(`${languages(guild, 'EEVT_2')}`)
            break;
        case 'UnableToJoin':
            message.channel.send(`${languages(guild, 'EEVT_3')}`)
            break;
        case 'LiveVideo':
            message.channel.send('YouTube lives are not supported!')
            break;
        case 'VideoUnavailable':
            message.channel.send('This video is unavailable!');
            break;
        default:
            const track = player.nowPlaying(message)
            if(!track) return message.channel.send(`${languages(guild, 'EEVT_4')}`)
            const defaults = new MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setDescription(`❌ Error!`)
                .addFields(
                    {name: `If you are seeing this, I am sorry, there are some errors because of the Host location ('Some videos might not work because of some reason, maybe country-banned), See the error below:`, value: `\`\`\`${error}\`\`\``},
                    {name: `Try again without the song that **might have given** this error:`, value: `\`\`\`${track.title}\`\`\``}
                )
            message.channel.send(defaults).then(message.member.voice.channel.leave())
            
    };

};