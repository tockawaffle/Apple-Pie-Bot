const { MessageEmbed } = require('discord.js');
const languages = require('../../languages/languages')

module.exports = {
    run: async(client, message) => {
        const { guild } = message
        if(message.author.bot) return
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        const embed = new MessageEmbed()
            .setTitle("Bot Uptime!")
            .addFields(
                {
                    name: `${languages(guild, 'UPT_C')}`,
                    value: `${days} ${languages(guild, 'UPT_T3')}\n${hours} ${languages(guild, 'UPT_T')}\n${minutes} ${languages(guild, 'UPT_T2')}\n${seconds} ${languages(guild, 'UPT_T4')}.`,
                    inline: true
                },
                {
                    name: '│\n│\n│\n│\n│',
                    value: '│\n│\n│',
                    inline: true
                },
                {
                    name:  `${languages(guild, 'UPT_C2')}`,
                    value: `**${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB**`,
                    inline: true
                }
            )
            .setColor('E7B985')
        message.channel.send(embed)
        


    },aliases:['upt'], description: 'uptime'
}