module.exports = {
    run: async(client, message, args) => {

        const languages = require('../../util/languages/languages')
        const {guild} = message;

        if(message.author.bot) return;
        let msg = await message.channel.send(`🏓 Pinging....`)
        .then((msg) => {
            setTimeout(function() {
                msg.edit(`🏓 Pong!
    
                ${languages(guild, 'P_C')} **${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms**
                ${languages(guild, 'P2_C')} **${Math.round(client.ws.ping)}ms**
                
                ${languages(guild, 'P3_C')}
                ${languages(guild, 'P4_C')} **${guild.region}**`);
            }, 2000)
        })

    },
    aliases: ["ping"],
    description: "Latência e ping da API"
}
