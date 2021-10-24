async function oauthRemove(messageCreate) { 
    const 
        {MessageEmbed, MessageCollector} = require("discord.js"),
        { compareSync } = require("bcrypt"),
        {author} = messageCreate,
        lang = require("@lang"),
        userSchema = require("@db/schemas/userSchema"),
        userConfig = await userSchema.findOne({_id: author.id}),
        filter = m => m.author.id === messageCreate.author.id,
        collector = new MessageCollector(messageCreate.channel, {filter, max: 1, time: 120000});
        testEmbed = new MessageEmbed()
            .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
            .setDescription(lang(author, "oauth-remove-start"))
            .setColor("RANDOM")
    await messageCreate.reply({embeds: [testEmbed]})
        
    collector.on("end", async(c) => {
        const compareRecoveryHash = compareSync(c.map(x => x.content)[0], userConfig.oauth.recoveryCode);
        if(compareRecoveryHash === true) {
            await userSchema.findOneAndUpdate({_id: author.id}, { _id: author.id, $unset: {"oauth": 1}}, {upsert: true})
            const testEmbed =  new MessageEmbed()
                .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                .setDescription(lang(author, "oauth-remove-success"))
                .setColor("RANDOM")
            return await messageCreate.reply({embeds: [testEmbed]})
        } else {
            const 
                testEmbed = new MessageEmbed()
                    .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                    .setDescription(lang(author, "oauth-remove-failed"))
                    .setColor("DARK_RED")
            return await messageCreate.reply({embeds: [testEmbed]})
        }
    })
}

module.exports = {oauthRemove};