const languages = require('../../util/languages/languages')

module.exports = (player, message, query, tracks) => {

    const {guild} = message
    message.channel.send(`${languages(guild, 'SCVT')}`)

};
