const weather = require('weather-js');
const {MessageEmbed} = require('discord.js')
const languages = require('../../util/languages/languages')


module.exports = {
    run: (client, message, args) => {
        
        const { guild } = message;
        weather.find({search: args.split(0) , degreeType: 'C'}, function(err, result) {
            try {
                const embed = new MessageEmbed()
                    .setTitle(`${languages(guild, 'W_C')}  ${result[0].location.name}`)
                    .setColor('RANDOM')
                    .setFooter(`${languages(guild, 'W9_C')}`)
                    .setDescription(`${languages(guild, 'W2_C')}`)
                    .addField(`${languages(guild, 'W3_C')} `, `${result[0].current.temperature}ºC`, true)
                    .addField(`${languages(guild, 'W4_C')} `, result[0].current.skytext, true)
                    .addField(`${languages(guild, 'W5_C')} `, `${result[0].current.humidity}%`, true)
                    .addField(`${languages(guild, 'W6_C')} `, result[0].current.windspeed, true)
                    .addField(`${languages(guild, 'W7_C')} `, result[0].current.observationtime, true)
                    .addField(`${languages(guild, 'W8_C')} `, result[0].current.winddisplay, true)
                    .setThumbnail(result[0].current.imageUrl);
                message.channel.send(embed)
        } catch(err) {
            console.log(err)
            message.channel.send(`${languages(guild, 'W_ERR')}`)
        }
        });   
    },
    aliases: ["weather"],
    description: "Mostra o clima do local."
}