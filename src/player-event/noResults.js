const { MessageEmbed } = require("discord.js");
const languages = require('../util/languages/languages')

module.exports = (client, message, query) => {

    const {guild} = message
    message.channel.send(`${languages(guild, 'NRVT')} ${query} !`)
    console.log('ok')

};