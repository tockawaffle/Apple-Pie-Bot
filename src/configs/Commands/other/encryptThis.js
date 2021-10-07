async function encryptThis(messageCreate) {
    const 
        { MessageEmbed, MessageCollector } = require("discord.js"),
        {errorHandle} = require("@configs/other/errorHandle"),
        { hashSync, compareSync } = require("bcrypt"),
        {author} = messageCreate,
        passManSchema = require("@db/schemas/passManagerSchema"),
        openpgp = require("openpgp"),
        passSchema = await passManSchema.findOne({_id: author.id}),
        startEmbed = new MessageEmbed()
            .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
            .setColor("RANDOM")
    let counter = 0, 
    questions, functionToUse, data;
    
    try {
        if(!passSchema) {
            questions = [ "That said, let's start.\nFirst, tell me a password that you want to use.", "Now, give me a name for the account.", "Now you can give me the password, hint or something near (Personally, I'd not use the password itself, but something that's near enough that you'd remember it.), I'll encrypt it using aes256 method."]
            startEmbed.setDescription(`You've started the configuration for encrypting an account, since this is a vulnerable function, all the code is located [here](https://github.com/The-Crow-pleb/Apple-Pie-Bot), so if you're a dev and want to go check how this is made and if you can trust it, go for it!\n\`\`\`${questions[counter++]}\`\`\``)
            await messageCreate.reply({embeds: [startEmbed]})
            functionToUse = "notreg"
        } else {
            if(!passSchema.password) {
                questions = [ "That said, let's start.\nFirst, tell me a password that you want to use.", "Now, give me a name for the account you want to secure.", "Now you can give me the password, hint or something near (Personally, I'd not use the password itself, but something that's near enough that you'd remember it.), I'll encrypt it using aes256 method."]
                startEmbed.setDescription(`You've started the configuration for encrypting an account, since this is a vulnerable function, all the code is located [here](https://github.com/The-Crow-pleb/Apple-Pie-Bot), so if you're a dev and want to go check how this is made and if you can trust it, go for it!\n\`\`\`${questions[counter++]}\`\`\``)
                await messageCreate.reply({embeds: [startEmbed]})
                functionToUse = "nopass"
            } else {
                questions = [ "Give me the password you registered at the first time you used this command.","Now, give me a name for the account you want to secure.", "Now you can give me the password, hint or something near (Personally, I'd not use the password itself, but something that's near enough that you'd remember it.), I'll encrypt it using aes256 method."]
                startEmbed.setDescription(`You've started the configuration for encrypting an account, since this is a vulnerable function, all the code is located [here](https://github.com/The-Crow-pleb/Apple-Pie-Bot), so if you're a dev and want to go check how this is made and if you can trust it, go for it!\n\`\`\`${questions[counter++]}\`\`\``)
                await messageCreate.reply({embeds: [startEmbed]})
                functionToUse = "alreadyreg"
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

            if(collected.size < questions.length) { return await errorHandle(messageCreate, author, "Not enough answers to complete, redo the command.") } 
            
            const 
                passphrase = `${collected.map(x => x.content)[0]}`,
                hashPass = hashSync(passphrase, 10),
                accName = collected.map(x => x.content)[1],
                accPass = collected.map(x => x.content)[2],
                { privateKey, publicKey } = await openpgp.generateKey({
                    type: "ecc",
                    passphrase: passphrase,
                    format: "armored",
                    userIDs: [{name: author.username, id: author.id}]
                }),
                publicKeyGet = await openpgp.readKey({armoredKey: publicKey}),
                privateKeyGet = await openpgp.decryptKey({
                    privateKey: await openpgp.readPrivateKey({armoredKey: privateKey}),
                    passphrase: passphrase
                }),
                passEnc = await openpgp.encrypt({
                    message: await openpgp.createMessage({text: accPass}),
                    encryptionKeys: publicKeyGet,
                    signingKeys: privateKeyGet
                })

            const doneEmbed = new MessageEmbed()
                .setAuthor(author.username, author.displayAvatarURL({dynamic: true}))
                .setColor("RANDOM")
            if(functionToUse === "notreg") {
                data = {accName: accName, encPass: passEnc, date: Date.now(), privateKey: privateKey, publicKey: publicKey}
                await passManSchema.findOneAndUpdate({_id: author.id}, {_id: author.id, password: hashPass, premium: false, $push: {accounts: data}}, {upsert: true})
                doneEmbed.setDescription(`Successfully set! You were registered in the database since it was your first time using this function.\nNext time you'll only need to give the name and password of the account you wish to add!\nIf you are curious about the data that was stored, here it is:\`\`\`json\n${JSON.stringify(data)}\`\`\``)
                await messageCreate.reply({embeds: [doneEmbed]})
            } else if(functionToUse === "nopass") {
                data = {accName: accName, encPass: passEnc, date: Date.now(), privateKey: privateKey, publicKey: publicKey}
                await passManSchema.findOneAndUpdate({_id: author.id}, {_id: author.id, password: hashPass, premium: false, $push: {accounts: data}}, {upsert: true})
                doneEmbed.setDescription(`Successfully set! Next time you'll still need the password you registered to add another account to the encrypted database, since you did'nt had a password in my database (for some weird reason).\nIf you are curious about the data that was stored, here it is:\`\`\`json\n${JSON.stringify(data)}\`\`\``)
                await messageCreate.reply({embeds: [doneEmbed]})
            } else if(functionToUse === "alreadyreg") {
                const compareHash = compareSync(passphrase, passSchema.password)
                if(compareHash === false) {
                    return await errorHandle(messageCreate, author, "Wrong password given.\nForgot your password?")
                } else {
                    data = {accName:  accName, encPass:  passEnc, date: Date.now(), privateKey: privateKey, publicKey: publicKey}
                    await passManSchema.findOneAndUpdate({_id: author.id}, {_id: author.id, $push: {accounts: data}}, {upsert: true})
                    doneEmbed.setDescription(`Successfully set! Your account was stored.\nHere's the data that I stored:\`\`\`json\n${JSON.stringify(data)}\`\`\``)
                    await messageCreate.reply({embeds: [doneEmbed]})
                }
            } 
        })   
    } catch (error) {
        await errorHandle(messageCreate, author, error)
    }
}

module.exports = {encryptThis}