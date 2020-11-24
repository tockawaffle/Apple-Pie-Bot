const { MessageEmbed } = require("discord.js");
const languages = require('../util/languages/languages')

module.exports = (client, message, query, tracks) => {

    const {guild} = message

    message.channel.send({
        embed: {
            color: 'BLUE',
            author: { name: `${languages(guild, 'SEVT')} ${query}` },
            timestamp: new Date(),
            description: `${tracks.map((t, i) => `**${i + 1}** - ${t.title}`).join('\n')}`,
        },
    }).then(message.delete({timeout: 5000}))

};