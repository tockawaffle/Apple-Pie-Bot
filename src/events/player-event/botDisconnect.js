const { MessageEmbed } = require("discord.js");
const languages = require('../../util/languages/languages')

module.exports = async(client, message, queue) => {
    
    const {guild} = message
    message.channel.send(`${languages(guild, 'BTEVT')}`)
}