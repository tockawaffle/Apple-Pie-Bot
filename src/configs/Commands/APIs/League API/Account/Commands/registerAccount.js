const
    { MessageEmbed, MessageCollector } = require('discord.js'),
    { verifyCode } = require("../modules/verifyCode.js"),
    { getEncryptedSummonerId } = require("../modules/getEncryptedSummonerId.js"),
    { createVerificationCode } = require("../modules/createVerificationCode.js"),
    { checkGuild } = require("@configs/other/checkGuild"),
    lang = require("@lang")
    userSchema = require("@db/schemas/userSchema");

async function registerAccount(messageCreate) {
    try {
        let counter = 0;

        const 
            { author } = messageCreate,
            userConfig = await userSchema.findOne({_id: author.id}),
            verify = await checkGuild(messageCreate, author)
        if(verify === true) return

        if(userConfig.league) return messageCreate.reply(lang(author, "already_registered"))
        else {
            const
                questions = ["What is your summoner name?", "What is your region?"],
                startEmbed = new MessageEmbed()
                    .setAuthor({name: author.username, iconURL: author.displayAvatarURL({dynamic: true})})
                    .setDescription(questions[counter++])
                    .setColor("RANDOM")
                filter = m => m.author.id === messageCreate.author.id,
                collector = new MessageCollector(messageCreate.channel, {filter, max: questions.length, time: 1000*40});
            await messageCreate.reply({embeds: [startEmbed]})
            collector.on("collect", async(m) => {
                if(counter < questions.length) {
                    const nextQuestEmbed = new MessageEmbed()
                        .setAuthor({name: author.username, iconURL: author.displayAvatarURL({dynamic: true})})
                        .setDescription(questions[counter++])
                        .setColor("RANDOM")
                    await m.reply({embeds: [nextQuestEmbed]})
                }
            })

            collector.on("end", async(collected, reason) => {
                if(reason === "time") return messageCreate.reply(lang(author, "time_out"))
                else {
                    const
                        regOpts = ['br1','euw1','la1','la2','na1','oce','oc1','ru1','tr1','jp1','kr'],
                        summonerName = collected.first().content,
                        region = collected.last().content
                    if(regOpts.indexOf(region) !== -1) {
                        const 
                            { summonerEncryptedId, accountId } = await getEncryptedSummonerId(summonerName, region, messageCreate),
                            verificationCode = createVerificationCode(messageCreate)
                            verificationCodeEmbed = new MessageEmbed()
                                .setAuthor({name: author.username, iconURL: author.displayAvatarURL({dynamic: true})})
                                .setDescription(`${lang(author, "verification_code_sent").replace("{verificationCode}", verificationCode)}`)
                                .setColor("RANDOM")
                        await messageCreate.reply({embeds: [verificationCodeEmbed]})

                        let timesRun=0
                        const tryToVerify = setInterval(async() => {
                            timesRun+=1

                            const 
                                response = await verifyCode(summonerEncryptedId, verificationCode, region)
                            if(response === true) {
                                await userSchema.findOneAndUpdate({_id: author.id}, {$set: {league: {name: summonerName, region: region, summonerEncryptedId: summonerEncryptedId, accountId: accountId}}})
                                await messageCreate.reply(lang(author, "account_registered"))
                                return clearInterval(tryToVerify)
                            } else {
                                console.log("ya")
                                if(timesRun >= 6) {
                                    await messageCreate.reply(lang(author, "verification_code_doesnt_match"))
                                    return clearInterval(tryToVerify)
                                }
                            }
                        }, 10000)
                    } else {
                        return await messageCreate.reply(lang(author, "invalid_region"))
                    }
                }
            })
        }
    } catch (error) {
        throw error
    }
    
}

module.exports = {registerAccount}