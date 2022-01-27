const 
    {default: fetch} = require('node-fetch'),
    {MessageEmbed} = require("discord.js"),
    {checkGuild} = require("@configs/other/checkGuild"),
    userSchema = require("@db/schemas/userSchema");

async function getEncryptedSummonerId(summonerName, region, messageCreate) {

    const {author} = messageCreate

    try{
        const regOpts = ['br1','euw1','la1','la2','na1','oce','oc1','ru1','tr1','jp1','kr']
        if(regOpts.indexOf(region) !== -1) {
            const req = await fetch(new URL(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.RIOT_API_KEY}`))
            const reqjson = await req.json()
            const rpsStts = [400, 401, 403, 404, 405, 415, 429, 500, 502, 503, 504]
            if(rpsStts.indexOf(req.status) !== -1) {
                let errReq;
                if(req.status === 400) errReq = lang(guild, "http_error-400"); if(req.status === 504) errReq = lang(guild, "http_error-504"); if(req.status === 401) errReq = lang(guild, "http_error-401")
                if(req.status === 403) errReq = lang(guild, "http_error-403"); if(req.status === 405) errReq = lang(guild, "http_error-405")
                if(req.status === 415) errReq = lang(guild, "http_error-415"); if(req.status === 429) errReq = lang(guild, "http_error-429"); if(req.status === 500) errReq = lang(guild, "http_error-500")
                if(req.status === 502) errReq = lang(guild, "http_error-503");

                throw new Error(errReq)
            } else {
                return {
                    summonerEncryptedId: reqjson.id,
                    accountId: reqjson.accountId
                }
            }
        } else {
            throw new Error(lang(author, "invalid_region"))
        }
    }catch(error) {
        console.log(error)
    }
}

module.exports =  {getEncryptedSummonerId}