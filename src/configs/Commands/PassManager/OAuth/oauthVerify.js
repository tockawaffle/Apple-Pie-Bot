async function oauthVerify(messageCreate) {
    const 
        speakeasy = require("speakeasy"),
        {MessageEmbed, MessageCollector} = require("discord.js"),
        {makeid} = require("@configs/other/createId"),
        { hashSync } = require("bcrypt"),
        userSchema = require("@db/schemas/userSchema"),
        {author} = messageCreate,
        lang = require("@lang"),
        userConfig = await userSchema.findOne({_id: author.id}),
        id = makeid(5),
        recoverId = `R${id}`,
        hashedRecoveryCode = hashSync(recoverId, 10);
        filter = m => m.author.id === messageCreate.author.id,
        collector = new MessageCollector(messageCreate.channel, {filter, max: 1, time: 120000});
        startEmbed = new MessageEmbed()
            .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
            .setColor("RANDOM")
            .setDescription(lang(author, "oauth-verify-start"))
    await messageCreate.reply({embeds: [startEmbed]});
    collector.on("end", async(c) => {
        const verified = speakeasy.totp.verify({secret: userConfig.oauth.secret, encoding: "base32", token: c.map(x => x.content)[0], window: 6})
        if(verified === true) { 
            await userSchema.findOneAndUpdate({_id: author.id}, {_id: author.id, oauth: {verified: true, recoveryCode:  hashedRecoveryCode, secret: userConfig.oauth.secret, date: Date.now()}}, {upsert: true})
            const testEmbed = new MessageEmbed()
                .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                .setDescription(lang(author, "oauth-verify-success").replace("{code}", recoverId))
                .setColor("RANDOM")
            return await messageCreate.reply({embeds: [testEmbed]})
        } else {
            const testEmbed = new MessageEmbed()
                .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                .setDescription(lang(author, "oauth-verify-failed").replace("{prefix}", messageCreate.prefix))
                .setColor("RANDOM")
            return await messageCreate.reply({embeds: [testEmbed]})
        }
    })
}

module.exports = {oauthVerify}  