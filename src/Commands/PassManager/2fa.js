const 
    speakeasy = require("speakeasy"),
    {MessageEmbed, MessageCollector} = require("discord.js"),
    {toBuffer} = require("qrcode"),
    {makeid} = require("../../Configs/Commands/other/createId"),
    { hashSync, compareSync } = require("bcrypt"),
    userSchema = require("@db/schemas/userSchema"),
    lang = require("@lang")

module.exports = {
    aliases: [],
    run: async(client, messageCreate, args) => {
        const 
            {author} = messageCreate,
            userConfig = await userSchema.findOne({_id: author.id}),
            id = makeid(5),
            recoverId = `R${id}`,
            hashedRecoveryCode = hashSync(recoverId, 10);
        if(userConfig.oauth) {
            if(args[0] === "remove") {
                const
                    filter = m => m.author.id === messageCreate.author.id,
                    collector = new MessageCollector(messageCreate.channel, {filter, max: 1, time: 120000});
                    testEmbed = new MessageEmbed()
                        .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                        .setDescription(`Tell me,  what is your recovery code?`)
                        .setColor("RANDOM")
                    await messageCreate.reply({embeds: [testEmbed]})
                collector.on("end", async(c) => {
                    const compareRecoveryHash = compareSync(c.map(x => x.content)[0], userConfig.oauth.recoveryCode);
                    if(compareRecoveryHash === true) {
                        await userSchema.findOneAndUpdate({_id: author.id}, { _id: author.id, oauth: false}, {upsert: true})
                        const testEmbed =  new MessageEmbed()
                            .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                            .setDescription(`Your 2fa was removed, you can set it again.`)
                            .setColor("RANDOM")
                        return await messageCreate.reply({embeds: [testEmbed]})
                    } else {
                        const 
                            testEmbed = new MessageEmbed()
                                .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                                .setDescription(`Your recovery code is not correct.`)
                                .setColor("RANDOM")
                        return await messageCreate.reply({embeds: [testEmbed]})
                    }
                })
            } 
            // else if(args[0] === "redo") {

            // } else if(args[0] === "lost") { 
                
            // } 
            else if(!args[0]) {
                const testEmbed = new MessageEmbed()
                    .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                    .setDescription(`Seems like you already have one 2FA setted up\nIf you want to remove it, please, run this command using: ${messageCreate.prefix}2fa remove\nIf you want to redefine it, please, run this command using: ${messageCreate.prefix}2fa redo.`)
                    .setFooter(`Don't have a 2fa app? Try using Authy!`)
                    .setColor("RANDOM")
                return await messageCreate.reply({embeds: [testEmbed]})
            } else if(args[0] === "verify") {
                const 
                    filter = m => m.author.id === messageCreate.author.id,
                    collector = new MessageCollector(messageCreate.channel, {filter, max: 1, time: 120000});
                collector.on("end", async(c) => { 
                    const verified = speakeasy.totp.verify({secret: userConfig.oauth.secret, encoding: "base32", token: c.map(x => x.content)[0], window: 6})
                    if(verified === true) { 
                        await userSchema.findOneAndUpdate({_id: author.id}, {_id: author.id, oauth: {verified: true, recoveryCode:  hashedRecoveryCode, secret: userConfig.oauth.secret, date: Date.now()}}, {upsert: true})
                        const
                            testEmbed = new MessageEmbed()
                                .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                                .setDescription(`Your code is correct! You are now verified`)
                                .setColor("RANDOM")
                        return await messageCreate.reply({embeds: [testEmbed]})
                    } else  {
                        const
                            testEmbed = new MessageEmbed()
                                .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                                .setDescription(`Your code is incorrect!`)
                                .setColor("RANDOM")
                        return await messageCreate.reply({embeds: [testEmbed]})
                    }
                })
            }
        } else {
            const
                newSecret = speakeasy.generateSecret({name: `Apple Pie Discord Bot: ${author.username}`}),
                qrcode = await toBuffer(newSecret.otpauth_url),
                filter = m => m.author.id === messageCreate.author.id,
                collector = new MessageCollector(messageCreate.channel, {filter, max: 1, time: 120000}),
                testEmbed = new MessageEmbed()
                    .setDescription(`1 - Scan this URL code in your 2FA app. \n2 - After scanning, tell me the code shown to complete the setup.\nYou have 2 minutes to do this.\nDon't have a 2FA app? You can use [Authy](https://authy.com/download/).`)
                    .setImage("attachment://file.jpg")
            await messageCreate.reply({embeds: [testEmbed], files: [qrcode]})
            
            collector.on("end", async(c) => {
                const 
                    verified = speakeasy.totp.verify({secret: newSecret.base32, encoding: "base32", token: c.map(x => x.content)[0], window: 6})
                if(verified === true) {
                    await userSchema.findOneAndUpdate({_id: author.id}, {_id: author.id, oauth: {verified: true, recoveryCode:hashedRecoveryCode, secret: newSecret.base32, date: Date.now()}}, {upsert: true})
                    console.log(recoverId) 
                } else {
                    await userSchema.findOneAndUpdate({_id: author.id}, {_id: author.id, oauth: {verified: false, secret: newSecret.base32, date: Date.now()}}, {upsert: true})
                    const 
                        testEmbed = new MessageEmbed()
                            .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                            .setDescription(`Your recovery code is not correct. You can verify yourself using ${messageCreate.prefix}2fa verify.`)
                            .setColor("RANDOM")
                    return await messageCreate.reply({embeds: [testEmbed]})
                }
            }) 
        }
    }
}