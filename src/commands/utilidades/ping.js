module.exports = {
    run: async(client, message, args) => {

        const {guild} = message;
        if(message.author.bot) return;
        let msg = await message.channel.send(`🏓 Pinging....`)
        .then((msg) => {
            setTimeout(function() {
                msg.edit(`🏓 Pong!
    
                Meu ping é de; **${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms**
                O ping da API do Discord é de; **${Math.round(client.ws.ping)}ms**
                
                O ping pode variar da região do servidor! A host deste bot se localiza em: **Virginia-EUA**
                O servidor se encontra na região: **${guild.region}**`);
            }, 2000)
        })

    },
    aliases: ["ping"],
    description: "Latência e ping da API"
}
