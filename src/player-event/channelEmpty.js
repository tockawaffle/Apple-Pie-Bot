const { MessageEmbed } = require("discord.js");
const languages = require('../util/languages/languages')

module.exports = (client, message, queue) => {

    const {guild} = message
    message.channel.send(`${languages(guild, 'CEVT')}`)

};