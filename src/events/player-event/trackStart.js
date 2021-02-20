const { MessageEmbed } = require("discord.js");
const languages = require('../../util/languages/languages')

module.exports = (player, message, track) => {
    const {guild} = message
    const started = new MessageEmbed()
        .setTitle(`${track.requestedBy.username} ${languages(guild, 'MEVT')}`, track.thumbnail)
        .setDescription(`${track.title}`)
        .setColor('RANDOM')
    message.channel.send(started)
};