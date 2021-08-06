const { MessageEmbed } = require("discord.js");
const {default: fetch} = require("node-fetch");
const leagueSchema = require('../../../../configs/db/schemas/leagueSchema')
const lang = require('../../../../util/languages/languages')
const {URL} = require('url')
module.exports = {
    description: '', aliases: ['lr', 'leaguer', 'lreg'],
    run:async(client, message, args) => {

        const {author, guild} = message

        const region = args[0]; const name = args.slice(1).join(' '); message.channel.startTyping()
        if(!region || !name) {
            let err; if(!region) err = lang(guild, "lr-err-1"); else if(!name) err = lang(guild, "lr-err-1-b")
            const lErr = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setTitle(`❌${lang(guild, "M_E") + ' ' + lang(guild, "lr-err-ivdArg")}`)
                .setDescription(`\`\`\`${lang(guild, "lr-err").replace('{err}', err).replace('{err}', err)}\`\`\``)
                .setImage(await 'https://cdn.discordapp.com/attachments/828401264961912893/865711767597482024/download.png')
                .setColor('RANDOM')
            message.reply(lErr)
            return message.channel.stopTyping()
        }
        const regOpts = ['br1','euw1','la1','la2','na1','oce','oc1','ru1','tr1','jp1','kr']
        if(regOpts.indexOf(region) !== -1) {
            const req = await fetch(new URL(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${process.env.riotkey}`))
            const reqjson = await req.json()
            const rpsStts = [400, 401, 403, 404, 405, 415, 429, 500, 502, 503, 504]
            if(rpsStts.indexOf(req.status) !== -1) {
                let errReq;
                if(req.status === 400) errReq = lang(guild, "http_error-400"); if(req.status === 504) errReq = lang(guild, "http_error-504"); if(req.status === 401) errReq = lang(guild, "http_error-401")
                if(req.status === 403) errReq = lang(guild, "http_error-403"); if(req.status === 405) errReq = lang(guild, "http_error-405")
                if(req.status === 415) errReq = lang(guild, "http_error-415"); if(req.status === 429) errReq = lang(guild, "http_error-429"); if(req.status === 500) errReq = lang(guild, "http_error-500")
                if(req.status === 502) errReq = lang(guild, "http_error-503");

                const errEmbed = new MessageEmbed()
                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                    .setTitle(`${lang(guild, "M_E") + ' ' + errReq}`)
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
                const leagueCheck = await leagueSchema.findOne({_id: author.id})
                if(!leagueCheck) {
                    await leagueSchema.findOneAndUpdate({_id: author.id}, {_id: author.id, leagueReg: region, leagueName: name, leaguePUUID: reqjson.puuid, leagueEncSmId: reqjson.id}, {upsert: true})
                    const done = new MessageEmbed()
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                        .setTitle(lang(guild, "lr-done"))
                        .setDescription(lang(guild, "lr-done-desc").replace('{name}', name).replace("{region}", region).replace("{prefix}", message.prefix))
                        .setColor("RANDOM")
                    message.reply(done)
                    return message.channel.stopTyping()
                } else {
                    const alreadyReg = new MessageEmbed()
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                        .setTitle(lang(guild, "lr-al-reg"))
                        .setColor("RANDOM")
                    message.reply(alreadyReg)
                    return message.channel.stopTyping()
                }
            }
        } else {
            const errEmbed = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setTitle(`❌${lang(guild, "M_E") + ' ' + lang(guild, "lr-err-ivdRg")}`)
                .setDescription(`\`\`\`The region "${region}" is invalid, please, check it again.\`\`\``)
                .setImage(await 'https://cdn.discordapp.com/attachments/828401264961912893/865711767597482024/download.png')
                .setColor('RANDOM')
            message.reply(errEmbed)
            return message.channel.stopTyping()
        }
    }
}