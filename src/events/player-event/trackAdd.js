const { MessageEmbed } = require("discord.js");
const languages = require('../../util/languages/languages')

module.exports = async(player, message, queue, track) => {

    const {guild} = message
    const np = player.nowPlaying(message)
    const embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        .setTitle(`${track.requestedBy.username} ${languages(guild, 'MEVT_2')}`)
        .addFields(
            {name: languages(guild, "MEVT_3"), value: `\`\`\`${queue.tracks.length - 1}\`\`\``},
            {name: languages(guild, "NP_3"), value: `\`\`\`Current Music:\n${np.title + '\n' + player.createProgressBar(message, {timecodes: true, queue: true})}\`\`\``}
        )
        .setColor("RANDOM")
    message.reply(embed).then(msg => msg.delete({timeout: track.durationMS}))

};