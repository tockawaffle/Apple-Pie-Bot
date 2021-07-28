const { MessageEmbed } = require("discord.js");
const {default: fetch} = require("node-fetch");
const leagueSchema = require('../../../../configs/db/schemas/leagueSchema')
const lang = require('../../../../util/languages/languages')
const champsToFilter = require('../../../../configs/comandos/league/champs.json')
module.exports = {
    description: '', aliases: ['lacc'],
    run: async(client, message, args) => {

        try {
            if(message.mentions.users.first()) {
                const {guild, mentions: {users: target}} = message
                const targetId = target.first()
                const checkReg = await leagueSchema.findOne({_id: targetId.id})
                if(!checkReg) {
                    const notReg = new MessageEmbed()
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                        .setColor("RANDOM")
                        .setTitle(lang(guild, "lacc-not-reg"))
                        .setDescription(lang(guild, "lacc-not-reg-desc"))
                        .setImage(await 'https://cdn.discordapp.com/attachments/828401264961912893/865711767597482024/download.png')
                    return message.reply(notReg)
                }
                message.channel.startTyping()
                const maestryAmount = await fetch(`https://${checkReg.leagueReg}.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/${checkReg.leagueEncSmId}?api_key=${process.env.riotkey}`)
                const usualInfo = await fetch(`https://${checkReg.leagueReg}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${checkReg.leagueName}?api_key=${process.env.riotkey}`)
                const maestryChamps = await fetch(`https://${checkReg.leagueReg}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${checkReg.leagueEncSmId}?api_key=${process.env.riotkey}`)
                const rankedInfo = await fetch(`https://${checkReg.leagueReg}.api.riotgames.com/lol/league/v4/entries/by-summoner/${checkReg.leagueEncSmId}?api_key=${process.env.riotkey}`)
                const usualInfoJson = await usualInfo.json(); const mValue = await maestryAmount.json(); const mchInfo = await maestryChamps.json(); const rankedInfoJson = await rankedInfo.json()
                const firstIdToMatch = [`${mchInfo[0].championId}`]; const secondIdToMatch = [`${mchInfo[1].championId}`]; const thirdIdToMatch = [`${mchInfo[2].championId}`]
                const filteredFID = champsToFilter.filter(item => (
                    firstIdToMatch.includes(item.label)
                )).map(item => item.value)
                const filteredSID = champsToFilter.filter(item => (
                    secondIdToMatch.includes(item.label)
                )).map(item => item.value)
                const filteredTID = champsToFilter.filter(item => (
                    thirdIdToMatch.includes(item.label)
                )).map(item => item.value)
                
                const rpsStts = [400, 401, 403, 404, 405, 415, 429, 500, 502, 503, 504]
                if(rpsStts.indexOf(maestryAmount.status) !== -1) {
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
                        errEmbed.setDescription(`\`\`\`${lang(guild, "lr-err-404").replace("{name}", checkReg.leagueName).replace("{region}", checkReg.leagueReg)}\`\`\``)
                        errEmbed.setImage(await 'https://cdn.discordapp.com/attachments/828401264961912893/865711767597482024/download.png')
                        message.reply(errEmbed)
                        return message.channel.stopTyping()
                    } else {
                        message.reply(errEmbed)
                        return message.channel.stopTyping()
                    }
                } else {
                    let eloFlex; let firstToUse;       
                    if(rankedInfoJson[0].queueType === 'RANKED_FLEX_SR' && !rankedInfoJson[1]) { eloFlex = `${rankedInfoJson[0].tier} ${rankedInfoJson[0].rank} ${rankedInfoJson[0].leaguePoints} PDL`; firstToUse = 'Elo Flex Ranked: ' } 
                    else if(rankedInfoJson[0].queueType === 'RANKED_SOLO_5x5' && !rankedInfoJson[1]) { eloFlex = `${rankedInfoJson[0].tier} ${rankedInfoJson[0].rank} ${rankedInfoJson[0].leaguePoints} PDL`; firstToUse = 'Elo Solo/Duo Ranked: ' }
                    else if(rankedInfoJson[1].queueType === 'RANKED_SOLO_5x5' && rankedInfoJson[0].queueType === 'RANKED_FLEX_SR') { firstToUse = `Elo Solo/Duo: ${rankedInfoJson[0].tier} ${rankedInfoJson[0].rank} ${rankedInfoJson[0].leaguePoints} PD\nElo Flex: ${rankedInfoJson[1].tier} ${rankedInfoJson[1].rank} ${rankedInfoJson[1].leaguePoints} PDL`; eloFlex = ''; } 
                    else if(rankedInfoJson[0].queueType === 'RANKED_SOLO_5x5' && rankedInfoJson[1].queueType === 'RANKED_FLEX_SR') { firstToUse = `Elo Solo/Duo: ${rankedInfoJson[1].tier} ${rankedInfoJson[1].rank} ${rankedInfoJson[1].leaguePoints} PDL\nElo Flex: ${rankedInfoJson[0].tier} ${rankedInfoJson[0].rank} ${rankedInfoJson[0].leaguePoints} PDL`; eloFlex = ''; } 
                    else if(rankedInfoJson[0].queueType === 'RANKED_SOLO_5x5' && rankedInfoJson[1].queueType === 'RANKED_FLEX_SR') { firstToUse = `Elo Solo/Duo: ${rankedInfoJson[1].tier} ${rankedInfoJson[1].rank} ${rankedInfoJson[1].leaguePoints} PDL\nElo Flex: ${rankedInfoJson[0].tier} ${rankedInfoJson[0].rank} ${rankedInfoJson[0].leaguePoints} PDL`; eloFlex = ''; } 
                    else if(rankedInfoJson.length === 0) { eloFlex = lang(guild, "lacc-not-ranked"); firstToUse = lang(guild, "lacc-not-ranked") }
                    const leagueProfile = new MessageEmbed()
                        .setAuthor(checkReg.leagueName, await `http://ddragon.leagueoflegends.com/cdn/10.18.1/img/profileicon/${usualInfoJson.profileIconId}.png`)
                        .setDescription(`${lang(guild, "lacc-profile-info")}\`\`\`\n${lang(guild, "lacc-profile-level")} ${usualInfoJson.summonerLevel}\n${lang(guild, "lacc-champMaestry-points")} ${mValue}\n${firstToUse + eloFlex}\`\`\`\n${lang(guild, "lacc-champMaestry-points")}\`\`\`\n\n${filteredFID}: ${mchInfo[0].championPoints.toLocaleString()} ${lang(guild, "points")}\n${filteredSID}: ${mchInfo[1].championPoints.toLocaleString()} ${lang(guild, "points")}\n${filteredTID}: ${mchInfo[2].championPoints.toLocaleString()} ${lang(guild, "points")}\`\`\``)
                        .setColor("RANDOM")
                    message.reply(leagueProfile)
                    return message.channel.stopTyping()
                }
            } else {
                const {author, guild} = message
                const checkReg = await leagueSchema.findOne({_id: author.id})
                if(!checkReg) {
                    const notReg = new MessageEmbed()
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                        .setColor("RANDOM")
                        .setTitle(lang(guild, "lacc-not-reg"))
                        .setDescription(lang(guild, "lacc-not-reg-desc"))
                        .setImage(await 'https://cdn.discordapp.com/attachments/828401264961912893/865711767597482024/download.png')
                    return message.reply(notReg)
                } 
                message.channel.startTyping()
                const maestryAmount = await fetch(`https://${checkReg.leagueReg}.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/${checkReg.leagueEncSmId}?api_key=${process.env.riotkey}`)
                const usualInfo = await fetch(`https://${checkReg.leagueReg}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${checkReg.leagueName}?api_key=${process.env.riotkey}`)
                const maestryChamps = await fetch(`https://${checkReg.leagueReg}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${checkReg.leagueEncSmId}?api_key=${process.env.riotkey}`)
                const rankedInfo = await fetch(`https://${checkReg.leagueReg}.api.riotgames.com/lol/league/v4/entries/by-summoner/${checkReg.leagueEncSmId}?api_key=${process.env.riotkey}`)
                const usualInfoJson = await usualInfo.json(); const mValue = await maestryAmount.json(); const mchInfo = await maestryChamps.json(); const rankedInfoJson = await rankedInfo.json()
                const firstIdToMatch = [`${mchInfo[0].championId}`]; const secondIdToMatch = [`${mchInfo[1].championId}`]; const thirdIdToMatch = [`${mchInfo[2].championId}`]

                const filteredFID = champsToFilter.filter(item => (
                    firstIdToMatch.includes(item.label)
                )).map(item => item.value)
                const filteredSID = champsToFilter.filter(item => (
                    secondIdToMatch.includes(item.label)
                )).map(item => item.value)
                const filteredTID = champsToFilter.filter(item => (
                    thirdIdToMatch.includes(item.label)
                )).map(item => item.value)

                const rpsStts = [400, 401, 403, 404, 405, 415, 429, 500, 502, 503, 504]
                if(rpsStts.indexOf(maestryAmount.status) !== -1) {
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
                    } else {
                        message.reply(errEmbed)
                        return message.channel.stopTyping()
                    }
                } else {
                    let eloFlex; let firstToUse;       
                    if(rankedInfoJson[0].queueType === 'RANKED_FLEX_SR' && !rankedInfoJson[1]) { eloFlex = `${rankedInfoJson[0].tier} ${rankedInfoJson[0].rank} ${rankedInfoJson[0].leaguePoints} PDL`; firstToUse = 'Elo Flex Ranked: ' } 
                    else if(rankedInfoJson[0].queueType === 'RANKED_SOLO_5x5' && !rankedInfoJson[1]) { eloFlex = `${rankedInfoJson[0].tier} ${rankedInfoJson[0].rank} ${rankedInfoJson[0].leaguePoints} PDL`; firstToUse = 'Elo Solo/Duo Ranked: ' }
                    else if(rankedInfoJson[1].queueType === 'RANKED_SOLO_5x5' && rankedInfoJson[0].queueType === 'RANKED_FLEX_SR') { firstToUse = `Elo Solo/Duo: ${rankedInfoJson[0].tier} ${rankedInfoJson[0].rank} ${rankedInfoJson[0].leaguePoints} PD\nElo Flex: ${rankedInfoJson[1].tier} ${rankedInfoJson[1].rank} ${rankedInfoJson[1].leaguePoints} PDL`; eloFlex = ''; } 
                    else if(rankedInfoJson[0].queueType === 'RANKED_SOLO_5x5' && rankedInfoJson[1].queueType === 'RANKED_FLEX_SR') { firstToUse = `Elo Solo/Duo: ${rankedInfoJson[1].tier} ${rankedInfoJson[1].rank} ${rankedInfoJson[1].leaguePoints} PDL\nElo Flex: ${rankedInfoJson[0].tier} ${rankedInfoJson[0].rank} ${rankedInfoJson[0].leaguePoints} PDL`; eloFlex = ''; } 
                    else if(rankedInfoJson[0].queueType === 'RANKED_SOLO_5x5' && rankedInfoJson[1].queueType === 'RANKED_FLEX_SR') { firstToUse = `Elo Solo/Duo: ${rankedInfoJson[1].tier} ${rankedInfoJson[1].rank} ${rankedInfoJson[1].leaguePoints} PDL\nElo Flex: ${rankedInfoJson[0].tier} ${rankedInfoJson[0].rank} ${rankedInfoJson[0].leaguePoints} PDL`; eloFlex = ''; } 
                    else if(rankedInfoJson.length === 0) { eloFlex = lang(guild, "lacc-not-ranked"); firstToUse = lang(guild, "lacc-not-ranked") }
                    const leagueProfile = new MessageEmbed()
                        .setAuthor(checkReg.leagueName, await `http://ddragon.leagueoflegends.com/cdn/10.18.1/img/profileicon/${usualInfoJson.profileIconId}.png`)
                        .setDescription(`${lang(guild, "lacc-profile-info")}\`\`\`\n${lang(guild, "lacc-profile-level")} ${usualInfoJson.summonerLevel}\n${lang(guild, "lacc-champMaestry-points")} ${mValue}\n${firstToUse + eloFlex}\`\`\`\n${lang(guild, "lacc-champMaestry-points")}\`\`\`\n\n${filteredFID}: ${mchInfo[0].championPoints.toLocaleString()} ${lang(guild, "points")}\n${filteredSID}: ${mchInfo[1].championPoints.toLocaleString()} ${lang(guild, "points")}\n${filteredTID}: ${mchInfo[2].championPoints.toLocaleString()} ${lang(guild, "points")}\`\`\``)
                        .setColor("RANDOM")
                    message.reply(leagueProfile)
                    return message.channel.stopTyping()
                }
            }
        } catch (error) {
            console.log(error)
            const errorEmbed = new MessageEmbed()
                .setColor('#ffe135')
                .setAuthor(message.author.username, message.author.displayAvatarURL({dynamyc: true}))
                .setDescription(`Oops, Something went wrong!:\n\n\`\`\`diff\n +Error: ${error}\`\`\`\nIf this error persists, please, open an issue at my GitHub page.`) 
            message.reply(errorEmbed)
            message.channel.stopTyping()
        }
    }
}