async function decrypthis(messageCreate) {
    const 
        { MessageEmbed, MessageCollector } = require("discord.js"),
        { errorHandle } = require("@configs/other/errorHandle"),
        { compareSync } = require("bcrypt"),
        { author } = messageCreate,
        lang = require("@lang"),
        openpgp = require("openpgp"),
        passManSchema = require("@db/schemas/passManagerSchema"),
        passSchema = await passManSchema.findOne({_id: author.id})  

    if(!passSchema) {
        throw new Error(lang(author, "pass-decrypt-error-noreg").replace("{prefix}", messageCreate.prefix))
    } else if(!passSchema.password) {
        throw new Error(lang(author, "pass-decrypt-error-noreg").replace("{prefix}", messageCreate.prefix))
    } else {
        let counter = 0;
        const 
            passphrase = await passSchema.password,
            filter = m => m.author.id === messageCreate.author.id,
            questions = [await lang(author, "pass-decrypt-q1"), await lang(author, "pass-decrypt-q2")],
            collector = new MessageCollector(messageCreate.channel, {filter, max: questions.length, time: 1000*30}),
            startEmbed = new MessageEmbed()
                .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                .setColor("RANDOM")
                .setDescription(`\`\`\`${questions[counter++]}\`\`\``)
            await messageCreate.reply({embeds: [startEmbed]})

        collector.on("collect", async(m) => {
            if(counter < questions.length) {
                const nextQuestEmbed = new MessageEmbed()
                    .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                    .setColor("RANDOM")
                    .setDescription(`\`\`\`${questions[counter++]}\`\`\``)
                await m.reply({embeds: [nextQuestEmbed]})
            }
        })
        collector.on("end", async(c) => {
            const
                passphraseInput = c.map(x => x.content)[0]
                compareHash = compareSync(passphraseInput, passphrase)
            if(compareHash !== true) {return await errorHandle(messageCreate, author, lang(author, "pass-wrong").replace("{prefix}", messageCreate.prefix))}
            const 
                accName = c.map(x => x.content)[1],
                findAcc = await passManSchema.findOne({_id: author.id, accounts: {$elemMatch: {accName: accName}}}, {accounts: {$elemMatch: {accName: accName}}});
            if(findAcc) {
                const 
                    passEnc = await findAcc.accounts[0].encPass,
                    publicKey = await findAcc.accounts[0].publicKey,
                    privateKey = await findAcc.accounts[0].privateKey,
                    { data: decrypted, signatures } = await openpgp.decrypt({ message: await openpgp.readMessage({armoredMessage: passEnc}), verificationKeys: await openpgp.readKey({armoredKey: publicKey}), decryptionKeys:  await openpgp.decryptKey({ privateKey: await openpgp.readPrivateKey({armoredKey: privateKey}), passphrase: passphraseInput }) })
                try { await signatures[0].verified; } 
                catch (error) { await errorHandle(messageCreate, author, lang(author, "pass-decrypt-invalid-signature"))}
                try {
                    const decryptedEmbed = new MessageEmbed()
                        .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                        .setColor("RANDOM")
                        .setDescription(lang(author, "pass-decrypt-success").replace("{name}", accName).replace("{pass}", decrypted))
                    await messageCreate.reply({embeds: [decryptedEmbed]})
                } catch (error) {
                    return await errorHandle(messageCreate, author, error)
                }
            } else {
                return await errorHandle(messageCreate, author, lang(author, "pass-decrypt-account-not-found").replace("{name}", accName))
            }
        })
    }
}

module.exports = {decrypthis}