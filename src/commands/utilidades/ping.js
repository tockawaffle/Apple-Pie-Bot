module.exports = {
    run: async(client, message, args) => {
        let msg = await message.channel.send(`🏓 Pinging....`);

        msg.edit(`🏓 Pong!
        Meu ping é de; ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms
        O ping da API do Discord é de; ${Math.round(client.ws.ping)}ms`);
    },
    aliases: ["ping"],
    description: "Latência e ping da API"
}
