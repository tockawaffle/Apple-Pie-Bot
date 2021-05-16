const languages = require('../../util/languages/languages')

module.exports = (player, message, query, tracks, content, collector) => {

    const {guild} = message
    message.channel.send(`${languages(guild, 'SIVT')} **${tracks.length}** !`)

};