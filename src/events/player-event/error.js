const { MessageEmbed } = require("discord.js");
const languages = require('../../util/languages/languages')

module.exports = (client, error, message) => {
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
        default:
            message.channel.send(`${languages(guild, 'EEVT_4')} ${error}`)
    };

};