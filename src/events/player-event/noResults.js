const languages = require('../../util/languages/languages')

module.exports = (player, message, query) => {

    const {guild} = message
    message.channel.send(`${languages(guild, 'NRVT')} ${query} !`)

};