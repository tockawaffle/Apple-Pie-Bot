const { MessageEmbed } = require("discord.js");
const languages = require('../../util/languages/languages')

module.exports = (player, message, track) => {
    const {guild} = message
    const authorID = track.requestedBy.id
    const authorImage = message.guild.members.cache.get(authorID)
    const started = new MessageEmbed()
        .setAuthor(`${track.requestedBy.username} ${languages(guild, 'MEVT')}`, authorImage.user.displayAvatarURL({dynamic: true}))
        .setDescription(`\`\`\`Song name: ${track.title}\`\`\``)
        .setImage(track.thumbnail)
        .setColor('RANDOM')
    message.channel.send(started).then(msg => msg.delete({timeout: track.durationMS}))
};