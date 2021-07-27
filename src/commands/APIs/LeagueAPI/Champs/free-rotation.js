const { MessageEmbed } = require("discord.js"); const {default: fetch} = require("node-fetch");
const leagueSchema = require('../../../../configs/db/schemas/leagueSchema'); const lang = require('../../../../util/languages/languages')
const pages = require('discord.js-pagination')

module.exports = {
    aliases: ['fr', 'lfr', 'rot'], description: '',
    run: async(client, message, args) => {

        try {
            const {author: {id: targetId}, guild} = message
            const checkReg = await leagueSchema.findOne({_id: targetId})
            if(!checkReg) {
                const notReg = new MessageEmbed()
                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                    .setColor("RANDOM")
                    .setTitle(lang(guild, "lacc-not-reg"))
                    .setDescription(lang(guild, "lacc-not-reg-desc"))
                    .setImage(await 'https://cdn.discordapp.com/attachments/828401264961912893/865711767597482024/download.png')
                return message.reply(notReg)
            } else {
                message.channel.startTyping()
                const req = await fetch(`https://${checkReg.leagueReg}.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${process.env.riotkey}`)
                const rpsStts = [400, 401, 403, 404, 405, 415, 429, 500, 502, 503, 504]
                if(rpsStts.indexOf(req.status) !== -1) {
                    let errReq;
                    if(req.status === 400) errReq = lang(guild, "http_error-400"); if(req.status === 504) errReq = lang(guild, "http_error-504"); if(req.status === 401) errReq = lang(guild, "http_error-401")
                    if(req.status === 403) errReq = lang(guild, "http_error-403"); if(req.status === 405) errReq = lang(guild, "http_error-405")
                    if(req.status === 415) errReq = lang(guild, "http_error-415"); if(req.status === 429) errReq = lang(guild, "http_error-429"); if(req.status === 500) errReq = lang(guild, "http_error-500")
                    if(req.status === 502) errReq = lang(guild, "http_error-503");
    
                    const errEmbed = new MessageEmbed()
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                        .setTitle(`❌${lang(guild, "M_E")}`)
                        .setDescription(errReq)
                        .setColor('RANDOM')
                    if(req.status === 404){
                        errReq = lang(guild, "http_error-404")
                        errEmbed.setTitle(`❌ Error: ${errReq}`)
                        errEmbed.setDescription(`\`\`\`${lang(guild, "lr-err-404").replace("{name}", name).replace("{region}", region)}\`\`\``)
                        errEmbed.setImage(await 'https://cdn.discordapp.com/attachments/828401264961912893/865711767597482024/download.png')
                        message.reply(errEmbed)
                        return message.channel.stopTyping()
                    } else {message.reply(errEmbed); return message.channel.stopTyping()}
                } else {
                    const reqJson = await req.json()
                    const firstIdToMatch = [`${reqJson.freeChampionIds[0]}`,`${reqJson.freeChampionIds[1]}`,`${reqJson.freeChampionIds[2]}`,`${reqJson.freeChampionIds[3]}`,`${reqJson.freeChampionIds[4]}`,`${reqJson.freeChampionIds[5]}`,`${reqJson.freeChampionIds[6]}`,`${reqJson.freeChampionIds[7]}`,`${reqJson.freeChampionIds[8]}`,`${reqJson.freeChampionIds[9]}`,`${reqJson.freeChampionIds[10]}`,`${reqJson.freeChampionIds[11]}`,`${reqJson.freeChampionIds[12]}`,`${reqJson.freeChampionIds[13]}`,`${reqJson.freeChampionIds[14]}`]
                    const secondIdToMatch = [`${reqJson.freeChampionIdsForNewPlayers[1]}`,`${reqJson.freeChampionIdsForNewPlayers[2]}`,`${reqJson.freeChampionIdsForNewPlayers[3]}`,`${reqJson.freeChampionIdsForNewPlayers[4]}`,`${reqJson.freeChampionIdsForNewPlayers[5]}`,`${reqJson.freeChampionIdsForNewPlayers[6]}`,`${reqJson.freeChampionIdsForNewPlayers[7]}`,`${reqJson.freeChampionIdsForNewPlayers[8]}`,`${reqJson.freeChampionIdsForNewPlayers[9]}`,`${reqJson.freeChampionIdsForNewPlayers[10]}`,`${reqJson.freeChampionIdsForNewPlayers[11]}`,`${reqJson.freeChampionIdsForNewPlayers[12]}`,`${reqJson.freeChampionIdsForNewPlayers[13]}`,`${reqJson.freeChampionIdsForNewPlayers[14]}`,]
                    const champsToFilter = require('../../../../configs/comandos/league/champs.json')
                    const filteredFID = champsToFilter.filter(item => (
                        firstIdToMatch.includes(item.label)
                    )).map(item => item.value)
                    const filteredSID = champsToFilter.filter(item => (
                        secondIdToMatch.includes(item.label)
                    )).map(item => item.value)
                    const freeChampsList = filteredFID.join("\n");
                    const lowLevelFreeChamps = filteredSID.join("\n");
                    const evChampList = new MessageEmbed()
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                        .setDescription(`${lang(guild, "lfr-desc-evchamps")}\n\`\`\`${freeChampsList}\`\`\``)
                        .setColor("RANDOM")
                    const lowChampList = new MessageEmbed()
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                        .setColor("RANDOM")
                        .setDescription(`${lang(guild, "lft-desc-lowchamps")}\n\`\`\`${lowLevelFreeChamps}\`\`\``)
                    pgs = [evChampList, lowChampList]
                    pages(message, pgs); return message.channel.stopTyping()
                }
            }
        } catch (error) {
            const errorEmbed = new MessageEmbed()
                .setColor('#ffe135')
                .setAuthor(message.author.username, message.author.displayAvatarURL({dynamyc: true}))
                .setDescription(`Oops, Something went wrong!:\n\n\`\`\`diff\n +Error: ${error}\`\`\`\nIf this error persists, please, open an issue at my GitHub page.`) 
            message.reply(errorEmbed)
            message.channel.stopTyping()
        }

    }
}