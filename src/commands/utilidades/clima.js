const weather = require('weather-js');
const {MessageEmbed} = require('discord.js')

module.exports = {
    run: (client, message, args) => {
        
        weather.find({search: args.split(1) , degreeType: 'C'}, function(err, result) {
            try {
                const embed = new MessageEmbed()
                    .setTitle(`Clima em: ${result[0].location.name}`)
                    .setColor("RANDOM")
                    .setFooter('Talvez não seja 000% preciso!')
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
            message.channel.send("Não consegui encontrar informações do local. Tenha certeza de que você inseriu uma localização.\nUtilize desse modo: -clima <Cidade ou Estado>\nExemplo: -clima São Paulo")
        }
        });   
    },
    aliases: ["weather"],
    description: "Mostra o clima do local."
}