async function encryptThis(messageCreate) {
    const 
        { MessageEmbed, MessageCollector } = require("discord.js"),
        {errorHandle} = require("@configs/other/errorHandle"),
        { hashSync, compareSync } = require("bcrypt"),
        lang = require("@lang"),
        {author} = messageCreate,
        passManSchema = require("@db/schemas/passManagerSchema"),
        openpgp = require("openpgp"),
        passSchema = await passManSchema.findOne({_id: author.id}),
        startEmbed = new MessageEmbed()
            .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
            .setColor("RANDOM")
    let counter = 0, questions, functionToUse, data;
    
    try {
        if(!passSchema) {
            questions = [ lang(author, "pass-enc-q1"), lang(author, "pass-enc-q2"), lang(author, "pass-enc-q3")]
            startEmbed.setDescription(`\n\`\`\`${questions[counter++]}\`\`\``)
            await messageCreate.reply({embeds: [startEmbed]})
            functionToUse = "notreg"
        } else {
            if(!passSchema.password) {
                questions = [lang(author, "pass-enc-q1"), lang(author, "pass-enc-q2"), lang(author, "pass-enc-q3")]
                startEmbed.setDescription(`${lang(author, "pass-enc-start")}\n\`\`\`${questions[counter++]}\`\`\``)
                await messageCreate.reply({embeds: [startEmbed]})
                functionToUse = "nopass"
            } else {
                if(passSchema.accounts.length > 15 || passSchema.accounts.length == 15) {
                    const amountLimit = new MessageEmbed()
                        .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                        .setColor("DARK_RED")
                        .setDescription()
                    return await messageCreate.reply({embeds: [amountLimit]})
                } else {
                    questions = [ lang(author, "pass-enc-q4"), lang(author, "pass-enc-q5") , lang(author, "pass-enc-q3")]
                    startEmbed.setDescription(`${lang(author, "pass-enc-start")}\n\`\`\`${questions[counter++]}\`\`\``)
                    await messageCreate.reply({embeds: [startEmbed]})
                    functionToUse = "alreadyreg"
                }
            }
        }
        
        const filter = m => m.author.id === messageCreate.author.id,
        collector = new MessageCollector(messageCreate.channel, {filter, max: questions.length, time: 1000*15});
        collector.on("collect", async(m) => {
            if(counter < questions.length) {
                const nextQuestEmbed = new MessageEmbed()
                    .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                    .setColor("RANDOM")
                    .setDescription(`\`\`\`${questions[counter++]}\`\`\``)
                await m.reply({embeds: [nextQuestEmbed]})
            }
        })
        collector.on("end", async(collected) => {

            if(collected.size < questions.length) { return await errorHandle(messageCreate, author, lang(author, "pass-enc-end4")) } 
            const findDuplicate = await passManSchema.findOne({_id: author.id, accounts: {$elemMatch: {accName: collected.map(x => x.content)[1]}}})
            if(findDuplicate) {
                return await errorHandle(messageCreate, author, lang(author, "pass-enc-duplicate"))
            } else {
                const 
                    passphrase = `${collected.map(x => x.content)[0]}`,
                    hashPass = hashSync(passphrase, 10), //This is where the fun begins. This hashes the password at "collected.map(x => x.content)[0]"
                    accName = collected.map(x => x.content)[1],
                    accPass = collected.map(x => x.content)[2],
                    { privateKey, publicKey } = await openpgp.generateKey({
                        type: "ecc",
                        passphrase: passphrase,
                        format: "armored",
                        userIDs: [{name: author.username, id: author.id}]
                    }), //This generates a public and private block keys, using as the password for decryption the password given at "collected.map(x => x.content)[0]"
                    publicKeyGet = await openpgp.readKey({armoredKey: publicKey}),
                    privateKeyGet = await openpgp.decryptKey({
                        privateKey: await openpgp.readPrivateKey({armoredKey: privateKey}),
                        passphrase: passphrase
                    }),
                    passEnc = await openpgp.encrypt({
                        message: await openpgp.createMessage({text: accPass}),
                        encryptionKeys: publicKeyGet,
                        signingKeys: privateKeyGet
                    }), //This is where the password gets finally encrypted, with the signing key using the private key generated before and the encryption using the public key. It outputs a PGP Message using as decryption the password given.
                    doneEmbed = new MessageEmbed()
                        .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                        .setColor("RANDOM");
                //Bellow you can find the code storing everything it needs to decrypt later.
                if(functionToUse === "notreg") {
                    data = {accName: accName, encPass: passEnc, date: Date.now(), privateKey: privateKey, publicKey: publicKey}
                    await passManSchema.findOneAndUpdate({_id: author.id}, {_id: author.id, password: hashPass, premium: false, $push: {accounts: data}}, {upsert: true})
                    doneEmbed.setDescription(`${lang(author, "pass-enc-end1")}\`\`\`json\n${JSON.stringify(data)}\`\`\``)
                    await messageCreate.reply({embeds: [doneEmbed]})
                } else if(functionToUse === "nopass") {
                    data = {accName: accName, encPass: passEnc, date: Date.now(), privateKey: privateKey, publicKey: publicKey}
                    await passManSchema.findOneAndUpdate({_id: author.id}, {_id: author.id, password: hashPass, premium: false, $push: {accounts: data}}, {upsert: true})
                    doneEmbed.setDescription(`${lang(author, "pass-enc-end2")}\`\`\`json\n${JSON.stringify(data)}\`\`\``)
                    await messageCreate.reply({embeds: [doneEmbed]})
                } else if(functionToUse === "alreadyreg") {
                    const compareHash = compareSync(passphrase, passSchema.password)
                    if(compareHash === false) {
                        //If the password is not the same as the compared hash, it'll return this and end the code before anything.
                        return await errorHandle(messageCreate, author, lang(author, "pass-wrong"))
                    } else {
                        data = {accName:  accName, encPass:  passEnc, date: Date.now(), privateKey: privateKey, publicKey: publicKey}
                        await passManSchema.findOneAndUpdate({_id: author.id}, {_id: author.id, $push: {accounts: data}}, {upsert: true})
                        doneEmbed.setDescription(`${lang(author, "pass-enc-end3")}\`\`\`json\n${JSON.stringify(data)}\`\`\``)
                        await messageCreate.reply({embeds: [doneEmbed]})
                    }
                } 
            }
        })   
    } catch (error) {
        await errorHandle(messageCreate, author, error)
    }
}

module.exports = {encryptThis}