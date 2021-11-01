async function oauthSetup(messageCreate) { 

    const 
        {author} = messageCreate,
        {MessageEmbed, MessageCollector} = require("discord.js"),
        {toBuffer} = require("qrcode"),
        {makeid} = require("@configs/other/createId"),
        { hashSync } = require("bcrypt"),
        userSchema = require("@db/schemas/userSchema"),
        lang = require("@lang"),
        speakeasy = require("speakeasy"),
        id = makeid(5),
        recoverId = `R${id}`,
        hashedRecoveryCode = hashSync(recoverId, 10);
    const
        newSecret = speakeasy.generateSecret({name: `Apple Pie Discord Bot: ${author.username}`}),
        qrcode = await toBuffer(newSecret.otpauth_url),
        filter = m => m.author.id === messageCreate.author.id,
        collector = new MessageCollector(messageCreate.channel, {filter, max: 1, time: 120000}),
        startEmbed = new MessageEmbed()
            .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
            .setDescription(lang(author, "oauth-setup"))
            .setImage("attachment://file.jpg")
            .setColor("RANDOM")
    await messageCreate.reply({embeds: [startEmbed], files: [qrcode]})
    
    collector.on("end", async(c) => {
        const 
            verified = speakeasy.totp.verify({secret: newSecret.base32, encoding: "base32", token: c.map(x => x.content)[0], window: 6})
        if(verified === true) {
            await userSchema.findOneAndUpdate({_id: author.id}, {_id: author.id, oauth: {verified: true, recoveryCode:hashedRecoveryCode, secret: newSecret.base32, date: Date.now()}}, {upsert: true})
            const finishEmbed = new MessageEmbed()
                .setAuthor(author.username, author.avatarURL({dynamic: true}))
                .setColor("RANDOM")
                .setDescription(lang(author, "oauth-setup-success").replace("{code}", recoverId))
            await messageCreate.reply({embeds: [finishEmbed]})
        } else {
            await userSchema.findOneAndUpdate({_id: author.id}, {_id: author.id, oauth: {verified: false, secret: newSecret.base32, date: Date.now()}}, {upsert: true})
            const wrongCode = new MessageEmbed()
                .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                .setDescription(lang(author, "oauth-setup-incorrectCode"))
                .setColor("RANDOM")
            return await messageCreate.reply({embeds: [wrongCode]})
        }
    }) 
}

module.exports = {oauthSetup}