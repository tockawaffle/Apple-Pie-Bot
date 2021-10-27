const 
    {errorHandle} = require("@configs/other/errorHandle"),
    { MessageEmbed } = require("discord.js"),
    { find } = require("weather-js"),
    { buttonsPagination: pagination } = require("djs-buttons-pagination"),
    moment = require("moment"),
    lang = require("@lang");
module.exports = {
    aliases: ["clima"],
    run: async(client, messageCreate, args) => {
        const {author} = messageCreate
        
        try {
            const input = args.join(' ')
            let langToUse = messageCreate.lang
            if(langToUse === "portugues") {langToUse = "pt-br"}
            else if(langToUse === "english") {langToUse = "en-US"}
            await find({search: input, degreeType: "C", lang: langToUse}, async(err, result) => {
                if(err) { return errorHandle(messageCreate, author, error) } 
                else if(result.length === 0) { const error = `No location found`; return await errorHandle(messageCreate, author, error) }  
                const 
                    temperature = result[0].current.temperature + ' °C'; ;const feelsLike = result[0].current.feelslike + ' °C',
                    skytext = result[0].current.skytext; const humidity = result[0].current.humidity,
                    windspeed = result[0].current.windspeed; const observation = result[0].current.observationtime; const currentImage = result[0].current.imageUrl,
                 
                    forecastOne_temperatureHigh = result[0].forecast[0].high,
                    forecastOne_temperatureLow = result[0].forecast[0].low,
                    forecastOne_skytext = result[0].forecast[0].skytextday,
                    forecastOne_date = result[0].forecast[0].date,
                    forecastOne_format = moment(forecastOne_date).locale(langToUse).format("L"),
                    forecastOne_precip = result[0].forecast[0].precip ? result[0].forecast[0].precip: 0,
                    forecastOneText = `**${lang(author, "date")} ${forecastOne_format}**\`\`\`${lang(author, "high")} ${forecastOne_temperatureHigh}\n${lang(author, "low")} ${forecastOne_temperatureLow}\n${lang(author, "sky")} ${forecastOne_skytext}\n${lang(author, "precip")} ${forecastOne_precip}\`\`\``,

                    forecastTwo_temperatureHigh = result[0].forecast[1].high,
                    forecastTwo_temperatureLow = result[0].forecast[1].low,
                    forecastTwo_skytext = result[0].forecast[1].skytextday,
                    forecastTwo_date = result[0].forecast[1].date,
                    forecastTwo_format = moment(forecastTwo_date).locale(langToUse).format("L"),
                    forecastTwo_precip = result[0].forecast[1].precip ? result[0].forecast[1].precip: 0,
                    forecastTwoText = `**${lang(author, "date")} ${forecastTwo_format}**\`\`\`${lang(author, "high")} ${forecastTwo_temperatureHigh}\n${lang(author, "low")} ${forecastTwo_temperatureLow}\n${lang(author, "sky")} ${forecastTwo_skytext}\n${lang(author, "precip")} ${forecastTwo_precip}\`\`\``,

                    forecastThree_temperatureHigh = result[0].forecast[2].high,
                    forecastThree_temperatureLow = result[0].forecast[2].low,
                    forecastThree_skytext = result[0].forecast[2].skytextday,
                    forecastThree_date = result[0].forecast[2].date,
                    forecastThree_format = moment(forecastThree_date).locale(langToUse).format("L"),
                    forecastThree_precip = result[0].forecast[2].precip ? result[0].forecast[2].precip: 0,
                    forecastThreeText = `**${lang(author, "date")} ${forecastThree_format}**\`\`\`${lang(author, "high")} ${forecastThree_temperatureHigh}\n${lang(author, "low")} ${forecastThree_temperatureLow}\n${lang(author, "sky")} ${forecastThree_skytext}\n${lang(author, "precip")} ${forecastThree_precip}\`\`\``,

                    weatherText = `${lang(author, "weather")}\`\`\`${lang(author, "temperature")} ${temperature}\n${lang(author, "feelslike")} ${feelsLike}\n\n${lang(author, "sky")} ${skytext}\n${lang(author, "windspeed")} ${windspeed}\n${lang(author, "humidity")} ${humidity}\`\`\`\n${lang(author, "provided-by").replace("{lang}", langToUse)}`;
                const weatherEmbed = new MessageEmbed()
                    .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                    .setColor("RANDOM")
                    .setDescription(`${weatherText}`)
                    .setThumbnail(`${await currentImage}`)
                    .setFooter(`${lang(author, "obs-time")} ${observation} ${lang(author, "advise-not-100-accuratte")}`)
                const forecastOneEmbed = new MessageEmbed()
                    .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                    .setColor("RANDOM")
                    .setDescription(`${forecastOneText}`)
                    .setFooter(`${lang(author, "advise-not-100-accuratte")}`)
                const forecastTwoEmbed = new MessageEmbed()
                    .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                    .setColor("RANDOM")
                    .setDescription(`${forecastTwoText}`)
                    .setFooter(`${lang(author, "advise-not-100-accuratte")}`)
                const forecastThreeEmbed = new MessageEmbed()
                    .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                    .setColor("RANDOM")
                    .setDescription(`${forecastThreeText}`)
                    .setFooter(`${lang(author, "advise-not-100-accuratte")}`)
                return pagination(messageCreate, [weatherEmbed, forecastOneEmbed, forecastTwoEmbed, forecastThreeEmbed], [], 10000)
            })
        } catch (error) {
            await errorHandle(messageCreate, author, error)
        }
    }
}