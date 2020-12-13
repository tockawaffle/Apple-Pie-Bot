const {MessageEmbed} = require('discord.js')

module.exports = {
    aliases: [],
    description: 'Waterdrop Minigame',
    run: async(client, message) => {
        let a1 = '⬜'
        let a2 = '⬜'
        let a3 = '⬜'
        let b1 = '⬜'
        let b2 = '⬜'
        let b3 = '⬜'
        let c1 = '⬜'
        let c2 = '⬜'
        let c3 = '⬜'
        const filter = m => m.author.id === message.author.id
        const practice = '🟩🟩🟩🟩🟩\n🟩🟦🟦🟦🟩\n🟩🟦🟦🟦🟩\n🟩🟦🟦🟦🟩\n🟩🟩🟩🟩🟩'
        const level1 = [1, 2, 3, 4]
        const randomIndex = Math.floor(Math.random() * level1.length)
        const level1Random = level1[randomIndex]
        const level2 = [1, 2, 3, 4, 5, 6]
        const randomIndex2 = Math.floor(Math.random() * level2.length)
        const level2Random = level2[randomIndex2]
        const level3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        const randomIndex3 = Math.floor(Math.random() * level3.length)
        const level3Random = level3[randomIndex3]
        const level4 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        const randomIndex4 = Math.floor(Math.random() * level4.length)
        const level4Random = level4[randomIndex4]
        let i = 0
        message.channel.send("Please wait 10 seconds as we're setting up the jumps!")

        const waterdrop = setInterval(() => {
            let d = ''
            let description = ''
            if (i == 0) {
                a1 = a2 = a3 = b1 = b2 = b3 = c1 = c2 = c3 = '🟦'
            } else if (i == 1) {
                if (level1Random == 1) {
                    a1 = a2 = a3 = b1 = b2 = b3 = '🟦'
                    c1 = c2 = c3 = '⬜'
                } else if (level1Random == 2) {
                    a1 = a2 = b1 = b2 = c1 = c2 = '🟦'
                    a3 = b3 = c3 = '⬜'
                } else if (level1Random == 3) {
                    b1 = b2 = b3 = c1 = c2 = c3 = '🟦'
                    a1 = a2 = a3 = '⬜'
                } else if (level1Random == 4) {
                    a2 = a3 = b2 = b3 = c2 = c2 = '🟦'
                    a1 = b1 = c1 = '⬜'
                }
            } else if (i == 2) {
                if (level2Random == 1) {
                    a1 = a2 = a3 = '🟦'
                    b1 = b2 = b3 = c1 = c2 = c3 = '⬜'
                } else if (level2Random == 2) {
                    b1 = b2 = b3 = '🟦'
                    a1 = a2 = a3 = c1 = c2 = c3 = '⬜'
                } else if (level2Random == 3) {
                    c1 = c2 = c3 = '🟦'
                    a1 = a2 = a3 = b1 = b2 = b3 = '⬜'
                } else if (level2Random == 4) {
                    a1 = b1 = c1 = '🟦'
                    a2 = a3 = b2 = b3 = c2 = c3 = '⬜'
                } else if (level2Random == 5) {
                    a2 = b2 = c2 = '🟦'
                    a1 = b1 = c1 = a3 = b3 = c3 = '⬜'
                } else if (level2Random == 6) {
                    a3 = b3 = c3 = '🟦'
                    a1 = a2 = b1 = b2 = c1 = c2 = '⬜'
                }
            } else if (i == 3) {
                if (level3Random == 1) {
                    a1 = a2 = '🟦'
                    a3 = b1 = b2 = b3 = c1 = c2 = c3 = '⬜'
                } else if (level3Random == 2) {
                    a2 = a3 = '🟦'
                    a1 = b1 = b2 = b3 = c1 = c2 = c3 = '⬜'
                } else if (level3Random == 3) {
                    b1 = b2 = '🟦'
                    a1 = a2 = a3 = b3 = c1 = c2 = c3 = '⬜'
                } else if (level3Random == 4) {
                    b2 = b3 = '🟦'
                    a1 = a2 = a3 = b1 = c1 = c2 = c3 = '⬜'
                } else if (level3Random == 5) {
                    c1 = c2 = '🟦'
                    a1 = a2 = a3 = b1 = b2 = b3 = c3 = '⬜'
                } else if (level3Random == 6) {
                    c2 = c3 = '🟦'
                    a1 = a2 = a3 = b1 = b2 = b3 = c1 = '⬜'
                } else if (level3Random == 7) {
                    a1 = b1 = '🟦'
                    a2 = a3 = b2 = b3 = c1 = c2 = c3 = '⬜'
                } else if (level3Random == 8) {
                    b1 = c1 = '🟦'
                    a1 = a2 = a3 = b2 = b3 = c2 = c3 = '⬜'
                } else if (level3Random == 9) {
                    a2 = b2 = '🟦'
                    a1 = a3 = b1 = b3 = c1 = c2 = c3 = '⬜'
                } else if (level3Random == 10) {
                    b2 = c2 = '🟦'
                    a1 = a2 = a3 = b1 = b3 = c1 = c3 = '⬜'
                } else if (level3Random == 11) {
                    a3 = b3 = '🟦'
                    a1 = a2 = b1 = b2 = c1 = c2 = c2 = '⬜'
                } else if (level3Random == 12) {
                    b3 = c3 = '🟦'
                    a1 = a2 = a3 = b1 = b2 = c1 = c3 = '⬜'
                }
            } else if (i == 4) {
                if (level4Random == 1) {
                    a1 = '🟦'
                    a2 = a3 = b1 = b2 = b3 = c1 = c2 = c3 = '⬜'
                } else if (level4Random == 2) {
                    a2 = '🟦'
                    a1 = a3 = b1 = b2 = b3 = c1 = c2 = c3 = '⬜'
                } else if (level4Random == 3) {
                    a3 = '🟦'
                    a1 = a2 = b1 = b2 = b3 = c1 = c2 = c3 = '⬜'
                } else if (level4Random == 4) {
                    b1 = '🟦'
                    a1 = a2 = a3 = b2 = b3 = c1 = c2 = c3 = '⬜'
                } else if (level4Random == 5) {
                    b2 = '🟦'
                    a1 = a2 = a3 = b1 = b3 = c1 = c2 = c3 = '⬜'
                } else if (level4Random == 6) {
                    b3 = '🟦'
                    a1 = a2 = a3 = b1 = b2 = c1 = c2 = c3 = '⬜'
                } else if (level4Random == 7) {
                    c1 = '🟦'
                    a1 = a2 = a3 = b1 = b2 = b3 = c2 = c3 = '⬜'
                } else if (level4Random == 8) {
                    c2 = '🟦'
                    a1 = a2 = a3 = b1 = b2 = b3 = c1 = c3 = '⬜'
                } else if (level4Random == 9) {
                    c3 = '🟦'
                    a1 = a2 = a3 = b1 = b2 = b3 = c1 = c2 = '⬜'
                }
            }
            const Embed = new MessageEmbed()
                .setTitle(`Waterdrop! - Round ${i + 1}`)
                .setDescription(`🧍‍♂️\n🟫\n\n\n\n\n\n🟩🟩🟩🟩🟩\n🟩${a1}${a2}${a3}🟩\n🟩${b1}${b2}${b3}🟩\n🟩${c1}${c2}${c3}🟩\n🟩🟩🟩🟩🟩`)
                .setFooter('You have 10 seconds to jump into the water!\nYou may type "cancel" at any time to stop the game.\n(Upper left, Up, Upper Right, Left, Middle, Right, Bottom Left, Bottom, Bottom Right)')
            message.channel.send(Embed).then(async message => {
                try {
                    msg = await message.channel.awaitMessages(filter, {
                        max: 1,
                        time: '10000',
                        errors: ['time']
                    });
                if (msg.first().content.toLowerCase().trim() === 'cancel') {
                    message.channel.send('Cancelled!')
                    clearInterval(waterdrop)
                } else {
                    if (msg.first().content.toLowerCase().trim() === 'upper left') {
                        if (a1 === '🟦') {
                            if (i != 4) {
                                message.channel.send('GG! Please wait for the other players to jump!')
                            } else {
                                message.channel.send('GG! You have won Waterdrop!!')
                                clearInterval(waterdrop)
                            }
                        } else {
                            title = 'You lose!'
                            description = 'You missed the water!'
                            a1 = '🟥'
                            clearInterval(waterdrop)
                        }
                    } else if (msg.first().content.toLowerCase().trim() === 'up') {
                        if (a2 === '🟦') {
                            if (i != 4) {
                                message.channel.send('GG! Please wait for the other players to jump!')
                            } else {
                                message.channel.send('GG! You have won Waterdrop!!')
                                clearInterval(waterdrop)
                            }
                        } else {
                            title = 'You lose!'
                            description = 'You missed the water!'
                            a2 = '🟥'
                            clearInterval(waterdrop)
                        }
                    } else if (msg.first().content.toLowerCase().trim() === 'upper right') {
                        if (a3 === '🟦') {
                            if (i != 4) {
                                message.channel.send('GG! Please wait for the other players to jump!')
                            } else {
                                message.channel.send('GG! You have won Waterdrop!!')
                                clearInterval(waterdrop)
                            }
                        } else {
                            title = 'You lose!'
                            description = 'You missed the water!'
                            a3 = '🟥'
                            clearInterval(waterdrop)
                        }
                    } else if (msg.first().content.toLowerCase().trim() === 'left') {
                        if (b1 === '🟦') {
                            if (i != 4) {
                                message.channel.send('GG! Please wait for the other players to jump!')
                            } else {
                                message.channel.send('GG! You have won Waterdrop!!')
                                clearInterval(waterdrop)
                            }
                        } else {
                            title = 'You lose!'
                            description = 'You missed the water!'
                            b1 = '🟥'
                            clearInterval(waterdrop)
                        }
                    } else if (msg.first().content.toLowerCase().trim() === 'middle') {
                        if (b2 === '🟦') {
                            if (i != 4) {
                                message.channel.send('GG! Please wait for the other players to jump!')
                            } else {
                                message.channel.send('GG! You have won Waterdrop!!')
                                clearInterval(waterdrop)
                            }
                        } else {
                            title = 'You lose!'
                            description = 'You missed the water!'
                            b2 = '🟥'
                            clearInterval(waterdrop)
                        }
                    } else if (msg.first().content.toLowerCase().trim() === 'right') {
                        if (b3 === '🟦') {
                            if (i != 4) {
                                message.channel.send('GG! Please wait for the other players to jump!')
                            } else {
                                message.channel.send('GG! You have won Waterdrop!!')
                                clearInterval(waterdrop)
                            }
                        } else {
                            title = 'You lose!'
                            description = 'You missed the water!'
                            b3 = '🟥'
                            clearInterval(waterdrop)
                        }
                    } else if (msg.first().content.toLowerCase().trim() === 'bottom left') {
                        if (c1 === '🟦') {
                            if (i != 4) {
                                message.channel.send('GG! Please wait for the other players to jump!')
                            } else {
                                message.channel.send('GG! You have won Waterdrop!!')
                                clearInterval(waterdrop)
                            }
                        } else {
                            title = 'You lose!'
                            description = 'You missed the water!'
                            c1 = '🟥'
                            clearInterval(waterdrop)
                        }
                    } else if (msg.first().content.toLowerCase().trim() === 'down' || msg.first().content.toLowerCase().trim() === 'bottom') {
                        if (c2 === '🟦') {
                            if (i != 4) {
                                message.channel.send('GG! Please wait for the other players to jump!')
                            } else {
                                message.channel.send('GG! You have won Waterdrop!!')
                                clearInterval(waterdrop)
                            }
                        } else {
                            title = 'You lose!'
                            description = 'You missed the water!'
                            c2 = '🟥'
                            clearInterval(waterdrop)
                        }
                    } else if (msg.first().content.toLowerCase().trim() === 'bottom right') {
                        if (c3 === '🟦') {
                            if (i != 4) {
                                message.channel.send('GG! Please wait for the other players to jump!')
                            } else {
                                message.channel.send('GG! You have won Waterdrop!!')
                                clearInterval(waterdrop)
                            }
                        } else {
                            title = 'You lose!'
                            description = 'You missed the water!'
                            c2 = '🟥'
                            clearInterval(waterdrop)
                        }
                    } else {
                        message.channel.send('Incorrect input, you completely missed the water and died!')
                        b2 = '🟥'
                        clearInterval(waterdrop)
                    }
                }
            } catch (ex) {
                title = 'You lose!'
                description = "10 Seconds have passed, and the host thought you were AFK so he pushed you off, resulting in you completely missing the water. Nice!"
                b2 = '🟥'
                clearInterval(waterdrop)
            }
                i++
                if (a1 == '🟥' || a2 == '🟥' || a3 == '🟥' || b1 == '🟥' || b2 == '🟥' || b3 == '🟥' || c1 == '🟥' || c2 == '🟥' || c3 == '🟥' || d == '🟥') {
                    const embedLose = new MessageEmbed()
                        .setTitle(title)
                        .setDescription(`${description}\n\n\n🟩🟩🟩🟩🟩\n🟩${a1}${a2}${a3}🟩\n🟩${b1}${b2}${b3}🟩\n🟩${c1}${c2}${c3}🟩\n🟩🟩🟩🟩🟩`)
                        .setColor(15158332)
                    message.channel.send(embedLose)
                }
            })
        }, 11000)
    }
}