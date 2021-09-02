const userSchema = require("../../configs/database/schemas/inviteCountSchema")
const guildSchema = require("../../configs/database/schemas/guildSchema");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const Captcha = require("@haileybot/captcha-generator")
const userLanguageSchema = require("../../configs/database/schemas/userSchema")
module.exports = async(tracker, member, type, invite) => {

    const userLang = await userLanguageSchema.findOne({_id: member.id})

    if(type === "vanity" ) {
        if(!userLang) {await userLanguageSchema.findOneAndUpdate({_id: member.id}, {id: member.id, language: "english"}, {upsert: true}); return} else return
    }
    else if(type === "unknown") {
        if(!userLang) {await userLanguageSchema.findOneAndUpdate({_id: member.id}, {id: member.id, language: "english"}, {upsert: true}); return} else return
    } 
    else if(type === "normal") {
        const captcha = new Captcha({height: 250, width: 100})
        const checker = await guildSchema.findOne({_id: member.guild.id})
        if(checker.ivEnabled === true) {
            if(member.id === invite.inviter.id) return
            const inviterUpdate = await userSchema.findOne({id: member.guild.id, inviterId: invite.inviter.id})
            const invitedUpdate = await userSchema.findOne({id: member.guild.id, invitedId: member.id})

            const channel = checker.ivChannel
            const channelFound = member.guild.channels.cache.find(x => x.id === channel)
            const attachment = new MessageAttachment(captcha.JPEGStream, "captcha.jpeg", {height: 250, width: 100})
            const inviteSay = new MessageEmbed()
                .setAuthor(member.guild.name, member.guild.iconURL({dynamic: true}))
                .setColor("RANDOM")
            var verifyEmbed = new MessageEmbed()
                .setAuthor(member.guild.name, member.guild.iconURL({dynamic: true}))
                .setColor("RANDOM")
                .attachFiles(attachment)
                .setDescription("Olá, este servidor requere que você complete o captcha antes de usar os chats do mesmo.\n\n**Por quê?**\nPois isso ajuda na segurança do servidor em casos de raid ou self-bots que podem ter intençoes maliciosas")
                .setImage("attachment://captcha.jpeg")

            if(!inviterUpdate) {
                //Creates and increment + 1 to the inviter if there isn't any
                await userSchema.findOneAndUpdate({id: member.guild.id, inviterId: invite.inviter.id}, {inviterId: invite.inviter.id, $inc: {inviterNumber: 1}}, {upsert: true})
                const inviterConfig = await userSchema.findOne({id: member.guild.id, inviterId: invite.inviter.id})
                if(!invitedUpdate) {
                    //Creates a db field for the invited if there isn't any
                    await userSchema.findOneAndUpdate({id: member.guild.id, invitedId: member.id},  {inviterId: member.id, inviterNumber: 0, confirmedInvs: 0, invitedBy: invite.inviter.id, confirmedCaptcha: false}, {upsert: true})
                    let tryToSend;
                    if(checker.ivCaptcha === true) {tryToSend = member.send(verifyEmbed).catch(() => {return "failedToSend"})}
                    else {tryToSend === "disabled"}
                    if(await tryToSend === "failedToSend" || await tryToSend === "disabled") {
                        if(!channelFound) return
                        inviteSay.setDescription(`\`\`\`${member.user.username} foi convidado por ${invite.inviter.username} pelo convite "${invite.code}", que agora tem o total de ${inviterConfig.inviterNumber} convidados\`\`\`\nEu não consegui enviar a mensagem de verificação para o usuário " ${member.user.username} ", por favor, utilize o  comando ${checker.prefix} para se verificar.`)
                        return channelFound.send(inviteSay)
                    } else {
                        if(!channelFound) {
                            const dm = await member.createDM()
                            await dm.awaitMessages(async(m) => {
                                if(m.author.id === member.id) {
                                    if (m.content.toUpperCase() === captcha.value)  {
                                        const invitedCheckCaptcha = await userSchema.findOne({id: member.guild.id, invitedId: member.id})
                                        if(invitedCheckCaptcha.confirmedCaptcha === true) {return member.send("Verificado Com Sucesso!")}
                                        else {
                                            await userSchema.findOneAndUpdate({id: member.guild.id, inviterId: member.id}, {confirmedCaptcha: true}, {upsert: true})
                                            await userSchema.findOneAndUpdate({id: member.guild.id, inviterId: invite.inviter.id}, {$inc: {confirmedInvs: 1}}, {upsert: true})
                                            return member.send("Verificado Com Sucesso!");
                                        } 
                                    } else return member.send(`Verificação Falhou, a resposta certa era:\n\`\`\`${captcha.value}\`\`\`\n\nPor favor, utilize o comando !verificar para refazer a verificação!}`);
                                }
                            }, {max: 1, time: 180000, errors: ["time"]}).catch(() => {return })
                        } else {
                            inviteSay.setDescription(`\`\`\`${member.user.username} foi convidado por ${invite.inviter.username} pelo convite "${invite.code}", que agora tem o total de ${inviterConfig.inviterNumber} convidados\`\`\``)
                            channelFound.send(inviteSay)
                            const dm = await member.createDM()
                            await dm.awaitMessages(async(m) => {
                                if(m.author.id === member.id) {
                                    if (m.content.toUpperCase() === captcha.value)  {
                                        const invitedCheckCaptcha = await userSchema.findOne({id: member.guild.id, invitedId: member.id})
                                        if(invitedCheckCaptcha.confirmedCaptcha === true) {return member.send("Verificado Com Sucesso!")}
                                        else {
                                            await userSchema.findOneAndUpdate({id: member.guild.id, inviterId: member.id}, {confirmedCaptcha: true}, {upsert: true})
                                            await userSchema.findOneAndUpdate({id: member.guild.id, inviterId: invite.inviter.id}, {$inc: {confirmedInvs: 1}}, {upsert: true})
                                            return member.send("Verificado Com Sucesso!");
                                        } 
                                    } else return member.send(`Verificação Falhou, a resposta certa era:\n\`\`\`${captcha.value}\`\`\`\n\nPor favor, utilize o comando !verificar para refazer a verificação!}`);
                                }
                            }, {max: 1, time: 180000, errors: ["time"]}).catch(() => {return })
                        }
                    }
                } else {
                    let tryToSend;
                    if(checker.ivCaptcha === true) {tryToSend = member.send(verifyEmbed).catch(() => {return "failedToSend"})}
                    else {tryToSend === "disabled"}
                    if(await tryToSend === "failedToSend" || await tryToSend === "disabled") {
                        if(!channelFound) return
                        inviteSay.setDescription(`\`\`\`${member.user.username} foi convidado por ${invite.inviter.username} pelo convite "${invite.code}", que agora tem o total de ${inviterConfig.inviterNumber} convidados\`\`\`\nEu não consegui enviar a mensagem de verificação para o usuário " ${member.user.username} ", por favor, utilize o  comando ${checker.prefix} para se verificar.`)
                        return channelFound.send(inviteSay)
                    } else {
                        if(!channelFound) {
                            const dm = await member.createDM()
                            await dm.awaitMessages(async(m) => {
                                if(m.author.id === member.id) {
                                    if (m.content.toUpperCase() === captcha.value)  {
                                        const invitedCheckCaptcha = await userSchema.findOne({id: member.guild.id, invitedId: member.id})
                                        if(invitedCheckCaptcha.confirmedCaptcha === true) {return member.send("Verificado Com Sucesso!")}
                                        else {
                                            await userSchema.findOneAndUpdate({id: member.guild.id, inviterId: member.id}, {confirmedCaptcha: true}, {upsert: true})
                                            await userSchema.findOneAndUpdate({id: member.guild.id, inviterId: invite.inviter.id}, {$inc: {confirmedInvs: 1}}, {upsert: true})
                                            return member.send("Verificado Com Sucesso!");
                                        } 
                                    } else return member.send(`Verificação Falhou, a resposta certa era:\n\`\`\`${captcha.value}\`\`\`\nPor favor, utilize o comando !verificar para refazer a verificação!}`);
                                }
                            }, {max: 1, time: 180000, errors: ["time"]}).catch(() => {return })
                        } else {
                            inviteSay.setDescription(`\`\`\`${member.user.username} foi convidado por ${invite.inviter.username} pelo convite "${invite.code}", que agora tem o total de ${inviterConfig.inviterNumber} convidados\`\`\``)
                            channelFound.send(inviteSay)
                            const dm = await member.createDM()
                            await dm.awaitMessages(async(m) => {
                                if(m.author.id === member.id) {
                                    if (m.content.toUpperCase() === captcha.value)  {
                                        const invitedCheckCaptcha = await userSchema.findOne({id: member.guild.id, invitedId: member.id})
                                        if(invitedCheckCaptcha.confirmedCaptcha === true) {return member.send("Verificado Com Sucesso!")}
                                        else {
                                            await userSchema.findOneAndUpdate({id: member.guild.id, inviterId: member.id}, {confirmedCaptcha: true}, {upsert: true})
                                            await userSchema.findOneAndUpdate({id: member.guild.id, inviterId: invite.inviter.id}, {$inc: {confirmedInvs: 1}}, {upsert: true})
                                            return member.send("Verificado Com Sucesso!");
                                        } 
                                    } else return member.send(`Verificação Falhou, a resposta certa era:\n\`\`\`${captcha.value}\`\`\`\nPor favor, utilize o comando !verificar para refazer a verificação!}`);
                                }
                            }, {max: 1, time: 180000, errors: ["time"]}).catch(() => {return })
                        }
                    }
                }
            } else {
                if(!invitedUpdate) {
                    //Find and increment +1 to the inviter, will only increase in number if the invited doens't have an entry in the db
                    //preventing future exploits
                    await userSchema.findOneAndUpdate({id: member.guild.id, inviterId: invite.inviter.id}, {inviterId: invite.inviter.id, $inc: {inviterNumber: 1}}, {upsert: true})
                    const inviterConfig = await userSchema.findOne({id: member.guild.id, inviterId: invite.inviter.id})
                    await userSchema.findOneAndUpdate({id: member.guild.id, invitedId: member.id},  {inviterId: member.id, inviterNumber: 0, confirmedInvs: 0, invitedBy: invite.inviter.id, confirmedCaptcha: false}, {upsert: true})
                    let tryToSend;
                    if(checker.ivCaptcha === true) {tryToSend = member.send(verifyEmbed).catch(() => {return "failedToSend"})}
                    else {tryToSend === "disabled"}
                    if(await tryToSend === "failedToSend" || await tryToSend === "disabled") {
                        if(!channelFound) return
                        inviteSay.setDescription(`\`\`\`${member.user.username} foi convidado por ${invite.inviter.username} pelo convite "${invite.code}", que agora tem o total de ${inviterConfig.inviterNumber} convidados.\`\`\`\nEu não consegui enviar a mensagem de verificação para o usuário " ${member.user.username} ", por favor, utilize o  comando ${checker.prefix} para se verificar.`)
                        return channelFound.send(inviteSay)
                    } else {
                        if(!channelFound) {
                            const dm = await member.createDM()
                            await dm.awaitMessages(async(m) => {
                                if(m.author.id === member.id) {
                                    if (m.content.toUpperCase() === captcha.value)  {
                                        const invitedCheckCaptcha = await userSchema.findOne({id: member.guild.id, invitedId: member.id})
                                        if(invitedCheckCaptcha.confirmedCaptcha === true) {return member.send("Verificado Com Sucesso!")}
                                        else {
                                            await userSchema.findOneAndUpdate({id: member.guild.id, inviterId: member.id}, {confirmedCaptcha: true}, {upsert: true})
                                            await userSchema.findOneAndUpdate({id: member.guild.id, inviterId: invite.inviter.id}, {$inc: {confirmedInvs: 1}}, {upsert: true})
                                            return member.send("Verificado Com Sucesso!");
                                        } 
                                    } else return member.send(`Verificação Falhou, a resposta certa era:\n\`\`\`${captcha.value}\`\`\`\n\nPor favor, utilize o comando !verificar para refazer a verificação!}`);
                                }
                            }, {max: 1, time: 180000, errors: ["time"]}).catch(() => {return })
                        } else {
                            inviteSay.setDescription(`\`\`\`${member.user.username} foi convidado por ${invite.inviter.username} pelo convite "${invite.code}", que agora tem o total de ${inviterConfig.inviterNumber} convidados\`\`\``)
                            channelFound.send(inviteSay)
                            const dm = await member.createDM()
                            await dm.awaitMessages(async(m) => {
                                if(m.author.id === member.id) {
                                    if (m.content.toUpperCase() === captcha.value)  {
                                        const invitedCheckCaptcha = await userSchema.findOne({id: member.guild.id, invitedId: member.id})
                                        if(invitedCheckCaptcha.confirmedCaptcha === true) {return member.send("Verificado Com Sucesso!")}
                                        else {
                                            await userSchema.findOneAndUpdate({id: member.guild.id, inviterId: member.id}, {confirmedCaptcha: true}, {upsert: true})
                                            await userSchema.findOneAndUpdate({id: member.guild.id, inviterId: invite.inviter.id}, {$inc: {confirmedInvs: 1}}, {upsert: true})
                                            return member.send("Verificado Com Sucesso!");
                                        } 
                                    } else return member.send(`Verificação Falhou, a resposta certa era:\n\`\`\`${captcha.value}\`\`\`\nPor favor, utilize o comando !verificar para refazer a verificação!}`);
                                }
                            }, {max: 1, time: 180000, errors: ["time"]}).catch(() => {return })
                        }
                    }
                } else {
                    const inviterConfig = await userSchema.findOne({id: member.guild.id, inviterId: invite.inviter.id})
                    const invitedConfig = await userSchema.findOne({id: member.guild.id, invitedId: member.id})
                    const findUser =  member.guild.members.cache.get(invitedConfig.invitedBy)
                    let tryToSend;
                    if(checker.ivCaptcha === true) {tryToSend = member.send(verifyEmbed).catch(() => {return "failedToSend"})}
                    else {tryToSend === "disabled"}
                    if(await tryToSend === "failedToSend" || await tryToSend === "disabled") {
                        if(!channelFound) return
                        inviteSay.setDescription(`\`\`\`${member.user.username} foi convidado por ${invite.inviter.username} pelo convite "${invite.code}", que agora tem o total de ${inviterConfig.inviterNumber} convidados. Porém, ${member.user.username} já tinha sido convidado anteriormente por ${findUser.user.username}, o que resulta na não adição no número de convidados de ${invite.inviter.username}\`\`\`\nEu não consegui enviar a mensagem de verificação para o usuário " ${member.user.username} ", por favor, utilize o  comando ${checker.prefix} para se verificar.`)
                        return channelFound.send(inviteSay)
                    } else {
                        if(!channelFound) {
                            const dm = await member.createDM()
                            await dm.awaitMessages(async(m) => {
                                if(m.author.id === member.id) {
                                    if (m.content.toUpperCase() === captcha.value)  {
                                        const invitedCheckCaptcha = await userSchema.findOne({id: member.guild.id, invitedId: member.id})
                                        if(invitedCheckCaptcha.confirmedCaptcha === true) {return member.send("Verificado Com Sucesso!")}
                                        else {
                                            await userSchema.findOneAndUpdate({id: member.guild.id, inviterId: member.id}, {confirmedCaptcha: true}, {upsert: true})
                                            await userSchema.findOneAndUpdate({id: member.guild.id, inviterId: invite.inviter.id}, {$inc: {confirmedInvs: 1}}, {upsert: true})
                                            return member.send("Verificado Com Sucesso!");
                                        } 
                                    } else return member.send(`Verificação Falhou, a resposta certa era:\n\`\`\`${captcha.value}\`\`\`\nPor favor, utilize o comando !verificar para refazer a verificação!}`);
                                }
                            }, {max: 1, time: 180000, errors: ["time"]}).catch(() => {return })
                        } else {
                            inviteSay.setDescription(`\`\`\`${member.user.username} foi convidado por ${invite.inviter.username} pelo convite "${invite.code}", que agora tem o total de ${inviterConfig.inviterNumber} convidados\`\`\``)
                            channelFound.send(inviteSay)
                            const dm = await member.createDM()
                            await dm.awaitMessages(async(m) => {
                                if(m.author.id === member.id) {
                                    if (m.content.toUpperCase() === captcha.value)  {
                                        const invitedCheckCaptcha = await userSchema.findOne({id: member.guild.id, invitedId: member.id})
                                        if(invitedCheckCaptcha.confirmedCaptcha === true) {return member.send("Verificado Com Sucesso!")}
                                        else {
                                            await userSchema.findOneAndUpdate({id: member.guild.id, inviterId: member.id}, {confirmedCaptcha: true}, {upsert: true})
                                            await userSchema.findOneAndUpdate({id: member.guild.id, inviterId: invite.inviter.id}, {$inc: {confirmedInvs: 1}}, {upsert: true})
                                            return member.send("Verificado Com Sucesso!");
                                        } 
                                    } else return member.send(`Verificação Falhou, a resposta certa era:\n\`\`\`${captcha.value}\`\`\`\nPor favor, utilize o comando !verificar para refazer a verificação!}`);
                                }
                            }, {max: 1, time: 180000, errors: ["time"]}).catch(() => {return })
                        }
                    }
                }
            }
        } else return
    }
};