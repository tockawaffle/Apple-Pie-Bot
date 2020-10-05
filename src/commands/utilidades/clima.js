const weather = require('weather-js');
const discord = require('discord.js')

module.exports = {
    run: (client, message, args) => {
        if(args.length === 0) {
        return message.channel.send("Insira a localização")
        }

        weather.find({search: args.split(1) , degreeType: 'C'}, function(err, result) {
        try {
            let embed = new discord.MessageEmbed()
            .setTitle(`Clima em: ${result[0].location.name}`)
            .setColor("RANDOM")
            .setFooter('Talvez não seja 100% preciso!')
            .setDescription("Esse é o clima do local solicitado:")
            .addField("Temperatura", `${result[0].current.temperature}ºC`, true)
            .addField("Céu", result[0].current.skytext, true)
            .addField("Umidade", `${result[0].current.humidity}%`, true)
            .addField("Velocidade do Vento", result[0].current.windspeed, true)
            .addField("Tempo de Observação", result[0].current.observationtime, true)
            .addField("Direção do Vento", result[0].current.winddisplay, true)
            .setThumbnail(result[0].current.imageUrl);
            message.channel.send(embed)
        } catch(err) {
            return message.channel.send("Não consegui encontrar informações do local. Tenha certeza de que você inseriu uma localização.\nPara utilizar, digite o nome de um estado.")
        }
        });   
    },
    aliases: ["weather"],
    description: "Mostra o clima do local."
}