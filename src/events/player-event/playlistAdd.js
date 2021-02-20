const { MessageEmbed } = require("discord.js");
const languages = require('../../util/languages/languages')
module.exports = (player, message, playlist) => {

    const {guild} = message
    message.channel.send(`${playlist.title} ${languages(guild, 'PEVT')}`);

};