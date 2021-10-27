async function resetPass(messageCreate) {

    const
        {compareSync, hashSync} = require("bcrypt"),
        {MessageEmbed, MessageCollector} = require("discord.js"),
        {author} = messageCreate,
        speakeasy = require("speakeasy"),
        lang = require("@lang")
        passManSchema = require("@db/schemas/passManagerSchema"),
        userSchema = require("@db/schemas/userSchema"),
        userSchemaObj = await userSchema.findOne({_id: author.id});

    if(userSchemaObj.oauth.verified === true) {
        const
            passManObj = await passManSchema.findOne({userID: author.id});
        if(passManObj) { 
            const
                filter = m => m.author.id === author.id,
                collector = new MessageCollector(messageCreate.channel, {filter, max: 2, time: 30000});
                const startEmbed = new MessageEmbed()
                    .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                    .setDescription(lang(author, "respass-open"))
                    .setColor("RANDOM");
                await messageCreate.reply({embeds: [startEmbed]});
            collector.once("collect", async(m) => {
                const verifyOauth = speakeasy.totp.verify({secret: userSchemaObj.oauth.secret, encoding: "base32", token: collector.collected.map(m => m.content)[0], window: 6})
                if(verifyOauth === true) {        
                    const passwordEmbed = new MessageEmbed()
                        .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                        .setDescription(lang(author, "respass-newpass"))
                        .setColor("RANDOM");
                    await m.reply({embeds: [passwordEmbed]})
                } else {
                    await messageCreate.reply(lang(author, "respass-wrongcode"));
                    collector.stop("code not valid");
                }
            })
            collector.on("end", async(c) => {
                if(c.size === 2) {
                    const
                        pass = collector.collected.map(m => m.content)[1];
                    if(pass.length < 6) {
                        await messageCreate.reply(lang(author, "respass-shortpass"));
                    } else {
                        const compareHash = compareSync(pass, passManObj.password);
                        if(compareHash === true) {
                            await messageCreate.reply(lang(author, "respass-samepass"));
                        } else {
                            const
                                hash = await hashSync(pass, 14),
                                newPassManObj = await passManSchema.findOneAndUpdate({_id: author.id}, {$set: {password: hash}, $unset: {"accounts": 15}}, {new: true});
                            if(newPassManObj) {
                                await messageCreate.reply(lang(author, "respass-updatedpass"));
                            } else {
                                await messageCreate.reply(lang(author, "respass-error"));
                            }
                        }
                    }
                }
            })
        }
    }
}

module.exports = {resetPass};