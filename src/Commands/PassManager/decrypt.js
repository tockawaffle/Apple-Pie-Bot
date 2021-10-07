const 
    { MessageEmbed, MessageCollector } = require("discord.js"),
    {errorHandle} = require("@configs/other/errorHandle"),
    { compareSync } = require("bcrypt"),
    passManSchema = require("@db/schemas/passManagerSchema"),
    openpgp = require("openpgp");

module.exports = {
    aliases: ["decrypthis"],
    run: async(client, messageCreate, args) => {
        const 
            {author} = messageCreate,
            passSchema = await passManSchema.findOne({_id:author.id}),
            passphrase = await passSchema.password
        if(!passSchema || !passphrase) {
            
        } else {
            let counter = 0;
            const 
                filter = m => m.author.id === messageCreate.author.id,
                questions = ["Please, tell me your password.", "Now, tell me what account you want to get the information from."],
                collector = new MessageCollector(messageCreate.channel, {filter, max: questions.length, time: 1000*15}),
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
                if(compareHash !== true) {return console.log("ok")}
                const 
                    accName = c.map(x => x.content)[1],
                    findAcc = await passManSchema.findOne({_id: author.id, accounts: {$elemMatch: {accName: accName}}}, {accounts: {$elemMatch: {accName: accName}}});
                if(findAcc) {
                    
                    const 
                        passEnc = findAcc.accounts[0].encPass,
                        publicKey = findAcc.accounts[0].publicKey,
                        privateKey = findAcc.accounts[0].privateKey,
                        message = await openpgp.readMessage({armoredMessage: passEnc}),
                        { data: decrypted, signatures } = await openpgp.decrypt({ message, verificationKeys: await openpgp.readKey({armoredKey: publicKey}), decryptionKeys:  await openpgp.decryptKey({ privateKey: await openpgp.readPrivateKey({armoredKey: privateKey}), passphrase: passphraseInput }) })
                
                } else {
                    
                }
            })
        }
    }
}